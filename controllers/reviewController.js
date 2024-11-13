// controllers/reviewController.js

const Review = require('../models/reviewModel');
const Movie = require('../models/movieModel');

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const movieId = req.params.movieId;
    const userId = req.user._id;

    // Check if user already reviewed the movie
    const existingReview = await Review.findOne({ user: userId, movie: movieId });
    if (existingReview)
      return res.status(400).json({ message: 'You have already reviewed this movie' });

    const review = await Review.create({
      user: userId,
      movie: movieId,
      rating,
      comment,
    });

    // Update movie's average rating
    const reviews = await Review.find({ movie: movieId });
    const ratingsCount = reviews.length;
    const averageRating =
      reviews.reduce((sum, review) => sum + review.rating, 0) / ratingsCount;

    await Movie.findByIdAndUpdate(movieId, { averageRating, ratingsCount });

    res.status(201).json({ review });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add review', error: err.message });
  }
};

// Update Review
exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const updates = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: req.user._id },
      updates,
      { new: true }
    );
    if (!review)
      return res.status(404).json({ message: 'Review not found or unauthorized' });

    res.status(200).json({ review });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update review', error: err.message });
  }
};

// Delete Review
exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await Review.findOneAndDelete({ _id: reviewId, user: req.user._id });
    if (!review)
      return res.status(404).json({ message: 'Review not found or unauthorized' });

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete review', error: err.message });
  }
};

// Get Reviews by Movie
exports.getReviewsByMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const reviews = await Review.find({ movie: movieId })
      .populate('user', 'username')
      .sort('-createdAt');
    res.status(200).json({ reviews });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews', error: err.message });
  }
};
