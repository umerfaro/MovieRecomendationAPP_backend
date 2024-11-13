// controllers/recommendationController.js

const Movie = require('../models/movieModel');
const User = require('../models/userModel');

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user preferences
    const user = await User.findById(userId).populate('preferences.actors');
    const favoriteGenres = user.preferences.genres;
    const favoriteActors = user.preferences.actors.map(actor => actor._id);

    // Fetch movies based on user preferences
    const recommendedMovies = await Movie.find({
      $or: [
        { genre: { $in: favoriteGenres } },
        { cast: { $in: favoriteActors } },
      ],
    })
      .sort('-averageRating')
      .limit(20);

    res.status(200).json({ recommendedMovies });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get recommendations', error: err.message });
  }
};
