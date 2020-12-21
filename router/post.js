const express = require('express');
const verify = require('../validation');

const router = express.Router()

router.get('/', verify ,(req, res) =>{
    res.json({
        posts :{
            name : 'saad adam',
            address : 'omdurman'
        }
    })
})




module.exports = router;