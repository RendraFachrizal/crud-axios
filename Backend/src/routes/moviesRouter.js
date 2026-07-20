const express = require("express");
const moviesRouter = express.Router();
// const {getMovie} = require ("../controllers/moviesControllers.js")
// const {getMovieById} = require ("../controllers/moviesControllers.js")
// const {loggerMiddleware} = require ("../controllers/moviesControllers.js")
// const {tokenMiddleware} = require ("../controllers/moviesControllers.js")
// const {yearMiddleware} = require ("../controllers/moviesControllers.js")
// const {timeMiddleware} = require ("../controllers/moviesControllers.js")
// const {checkIdMoviesMiddleware} = require ("../controllers/moviesControllers.js")
// const {getMovieApi} = require ("../controllers/moviesControllers.js")
// const {getMovieByIdApi} = require ("../controllers/moviesControllers.js")

// moviesRouter.get('/movies', loggerMiddleware, tokenMiddleware, yearMiddleware, getMovieApi)
// moviesRouter.get('/movies/:id',loggerMiddleware, checkIdMoviesMiddleware, getMovieByIdApi )
// module.exports = {moviesRouter}

const {
  readMovie,
  readMovieById,
  createMovie,
  updatemovie,
  deletemovie,
} = require("../controllers/moviesControllers.js");
const authJWT = require("../middleware/auth.js");

moviesRouter.get("/movie", readMovie);
moviesRouter.get("/movie/:id", readMovieById);

moviesRouter.post("/movie", createMovie);
moviesRouter.put("/movie/:id", updatemovie);

moviesRouter.delete("/movie/:id", deletemovie);

module.exports = moviesRouter;
