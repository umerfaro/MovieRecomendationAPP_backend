// controllers/movieController.js

const Movie = require('../models/movieModel');
const Review = require('../models/reviewModel');

// Get All Movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().populate('director cast');
    res.status(200).json({ movies });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get movies', error: err.message });
  }
};

// Get Movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId)
      .populate('director cast');
    res.status(200).json({ movie });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get movie', error: err.message });
  }
};


// Add New Movie (Admin)
exports.addMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const movie = await Movie.create(movieData);
    res.status(201).json({ movie });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add movie', error: err.message });
  }
};

// Update Movie (Admin)
exports.updateMovie = async (req, res) => {
  try {
    const updates = req.body;
    const movie = await Movie.findByIdAndUpdate(req.params.movieId, updates, {
      new: true,
    });
    res.status(200).json({ movie });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update movie', error: err.message });
  }
};

// Delete Movie (Admin)
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.status(200).json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete movie', error: err.message });
  }
};
