const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/cinema';
const options = {useNewUrlParser: true};

mongoose.connect(url,options).then(()=>{
    console.log('Connected to MongoDb')
})

const db = mongoose.connection;

module.exports = db;