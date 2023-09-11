const Movie = require("../model/movie-model");

// create Movie
createMovie = (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      message: "You Must Provide a movie",
    });
  }
  //validate if movie is already exsits
  Movie.findOne({ name: body.name })
    .then((movie) => {
      if (movie) {
        return res.status(200).json({
          message: "Movie already exsist",
          name: movie.name,
          id: movie._id,
        });
      }
      const newMovie = new Movie(body);
      if (!newMovie) {
        return res.status(400).json({ error: err });
      }
      newMovie
        .save()
        .then(() => {
          return res.status(201).json({
            id: newMovie._id,
            message: "Movie Created",
          });
        })
        .catch((error) => {
          return res.status(400).json({
            error: error,
            message: "Movie Not Created",
          });
        });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
      });
    });
};
// updatg movie
updateMovie = (req, res) => {
  const body = req.body;
  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      message: "You Must Provide a movie",
    });
  }
  Movie.findOne({ _id: req.params.id })
    .then((movie) => {
      movie.name = body.name;
      (movie.time = body.time), (movie.rating = body.rating);
      movie.description = body.description;
      movie
        .save()
        .then(() => {
          return res.status(200).json({
            message: "Movie Updated",
            id: movie._id,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            message: "Movie Not Updated",
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Movie Not Found",
        error: err,
      });
    });
};
// create movie
deleteMovie = (req, res) => {
  Movie.findOneAndDelete({ _id: req.params.id })
    .then((movie) => {
      if (!movie) {
        return res.status(404).json({
          message: "Movie Not Found",
        });
      }
      return res.status(200).json({ message: "Movie Deleted", id: movie._id });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Movie Not Deleted",
        error: err,
      });
    });
};
// get movie
getAllMovieORgetMovieById = (req, res) => {
  if (req.params.id !== '""') {
    Movie.findOne({ _id: req.params.id })
      .then((movie) => {
        if (!movie) {
          return res.status(404).json({ error: "Movie not found" });
        }
        return res.status(200).json(movie);
      })
      .catch((err) => {
        return res.status(400).json({
          error: err,
        });
      });
  } else {
    Movie.find({})
      .then((movies) => {
        return res.status(200).json(movies);
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

module.exports = {
  createMovie,
  updateMovie,
  deleteMovie,
  getAllMovieORgetMovieById,
};
