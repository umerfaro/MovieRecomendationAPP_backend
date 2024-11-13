// controllers/userController.js

const User = require('../models/userModel');
const Movie = require('../models/movieModel');
const Actor = require('../models/actorModel'); // Import Actor model
const mongoose = require('mongoose');
// Get User Profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('preferences.actors')
      .populate('wishlist')
      .populate('customLists');
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get profile', error: err.message });
  }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update profile', error: err.message });
  }
};


exports.addToWishlist = async (req, res) => {
  try {
    const movieId = req.body.movieId;

    // Validate if movieId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    // Check if the movie exists in the database
    const movieExists = await Movie.findById(movieId);
    if (!movieExists) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { wishlist: movieId } }, // Use $addToSet to avoid duplicates
      { new: true }
    ).populate('wishlist');

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add to wishlist', error: err.message });
  }
};

// Get User Wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate({
        path: 'wishlist',
        model: 'Movie',
        select: 'title genre director releaseDate',
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get wishlist', error: err.message });
  }
};
// Remove Movie from Wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const movieId = req.params.movieId;

    // Validate that movieId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return res.status(400).json({ message: 'Invalid movie ID' });
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { wishlist: movieId } },
      { new: true }
    ).populate('wishlist');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to remove from wishlist', error: err.message });
  }
};