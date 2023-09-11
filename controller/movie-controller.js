const Movie = require("../model/movie-model");

// create Movie
createMovie = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: "You Must Provide a movie",
    });
  }
  const movie = new Movie(movie);
  if (!movie) {
    return res.status(400).json({ error: err });
  }
  movie
    .save()
    .then(() => {
      return res.status(201).json({
        id: movie._id,
        message: "Movie Created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error: error,
        message: "Movie Not Created",
      });
    });
};

updateMovie = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      message: "You Must Provide a movie",
    });
  }
  Movie.findOne({ _id: req.params.id }, async (err, movie) => {
    if (err) {
      return res.status(400).json({
        message: "Movie Not Found",
        error: err,
      });
    }
    movie.name = body.name;
    (movie.time = body.time), (movie.rating = body.rating);
    movie.description = body.description;
    movie
      .save()
      .then(() => {
        return res.status(200).json({
          message: "Movie Updated",
          id: movie_id,
        });
      })
      .catch((err) => {
        return res.status(400).json({
          message: "Movie Not Updated",
          error: err,
        });
      });
  });
};

deleteMovie = (_,res)=>{
    Movie.findOneAndDelete({},(err,movie)=>{
        if (err) {
            return res.status(400).json({
                message:"Movie Not Deleted",
                error:err,
            });
        }
        if (!movie) {
            return res.status(404).json({
                message:"Movie Not Found"
            })
        }
        return res.status(200).json({message:'Movie Deleted',id:movie._id}).catch((err)=>console.error(err));
    });
}



module.exports = {createMovie,updateMovie,deleteMovie}