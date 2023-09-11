const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./model/db');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
db.on('error',(error)=>{
    console.log(`Mongo Db Error =>${error}`);
});
app.get('/',(req,res)=>{
    return res.send('Hello World');
})
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))