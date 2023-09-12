/// init ///
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
/// Db ///
const db = require('./model/db');
/// Db ///
/// routes ///
const MovieRoutes = require('./routes/movie-router');
const UserRoute = require('./routes/user-router');
/// routes ///

/// main
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(bodyParser.json());
/// db
db.on('error',(error)=>{
    console.log(`Mongo Db Error =>${error}`);
});
/// endpoints
app.use('/api',MovieRoutes);
app.use('/api',UserRoute);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));