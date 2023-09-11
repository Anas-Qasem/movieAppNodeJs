const express = require('express');
const MovieCtrl = require('../controller/movie-controller');

const router = express.Router();

router.post('/createMovie',MovieCtrl.createMovie);
router.put('/updateMovie/:id',MovieCtrl.updateMovie);
router.delete('/deleteMovie/:id',MovieCtrl.deleteMovie);
router.get('/getMovie/:id',MovieCtrl.getAllMovieORgetMovieById);


module.exports = router;