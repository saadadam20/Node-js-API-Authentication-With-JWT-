const express = require('express');
const dotenv = require('dotenv');
const router = require('./router/route');
const post = require('./router/post')
const mongoose = require('mongoose');
const bodyPaser = require('body-parser');
dotenv.config()

const app = express();
mongoose.connect(process.env.url, {useNewUrlParser: true, useUnifiedTopology: true})
 .then((result) => {
    app.listen(process.env.port, ()=> console.log('listen to server on port | 3000'));

 })
 .catch(err => console.log(err));

// middel waer
app.use(express.json());
app.use(bodyPaser.json());
app.use('/', router);
app.use('/post', post);

