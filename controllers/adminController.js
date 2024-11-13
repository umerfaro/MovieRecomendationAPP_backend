// controllers/adminController.js

const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Review = require('../models/reviewModel');

exports.getSiteStatistics = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const movieCount = await Movie.countDocuments();
    const reviewCount = await Review.countDocuments();

    const popularMovies = await Movie.find().sort('-ratingsCount').limit(5);

    res.status(200).json({
      userCount,
      movieCount,
      reviewCount,
      popularMovies,
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get statistics', error: err.message });
  }
};
