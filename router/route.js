const express = require('express');
const User = require('../model/schema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { userrigster, userlogin} = require('../valid');
const { exist } = require('@hapi/joi');

const router = express.Router();
router.use(express.json());


router.post('/rgister', async(req, res)=>{ 
    // validation
    const {error} = userrigster(req.body);
    if (error) return res.status(400).send(error.details[0].message)

   // check if email exist
    const emailexist = await User.findOne({email: req.body.email});
    if (emailexist) return res.status(401).send('email is already exist');

    // create hash pass for password
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hash(req.body.password, salt)

    // create modele in mongoDb
    const user = new User({
        name:req.body.name,
        email : req.body.email,
        password : hashpassword
    });
    const save = await user.save();
    res.send(save)
 
})

router.get('/', (req, res)=>{
    res.send('hello world form sudan')
});


router.post('/login', async(req, res)=>{
     // validation
    const {error} = userlogin(req.body);
    if (error) return res.status(401).send(error.details[0].message)

    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).send('email or password not valid');

    const comperpass = await bcrypt.compare(req.body.password, user.password);
    if (!comperpass) return res.status(400).send('password is not valid');
    // create jwt 
    const token = jwt.sign({_id: user._id}, process.env.secryed );

    res.header('auth-token', token).send(token);
       

})

module.exports = router;