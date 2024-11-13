// controllers/notificationController.js

const Movie = require('../models/movieModel');
const User = require('../models/userModel');
const emailService = require('../utils/emailService');

// Notify Users of Upcoming Movies in Favorite Genres
// Notify Users of Upcoming Movies Based on Preferences
// Notify Users of Upcoming Movies Based on Preferences
exports.notifyUsersAboutUpcomingMovies = async (req, res) => {
  try {
    // Fetch all users with preferences
    const users = await User.find({}).populate('preferences.actors');

    // Fetch upcoming movies
    const upcomingMovies = await Movie.find({ upcoming: true }).sort('releaseDate');

    let notificationsSent = 0;

    for (const user of users) {
      let matchedMovies = [];

      // Filter movies by genres
      if (user.preferences.genres && user.preferences.genres.length > 0) {
        matchedMovies = upcomingMovies.filter(movie =>
          movie.genre.some(genre => user.preferences.genres.includes(genre))
        );
      }

      // Filter movies by favorite actors
      if (user.preferences.actors && user.preferences.actors.length > 0) {
        const actorIds = user.preferences.actors.map(actor => actor._id.toString());
        matchedMovies = matchedMovies.concat(
          upcomingMovies.filter(movie =>
            movie.cast.some(actorId => actorIds.includes(actorId.toString()))
          )
        );
      }

      // Remove duplicates from matchedMovies
      matchedMovies = matchedMovies.filter(
        (movie, index, self) =>
          index === self.findIndex(m => m._id.toString() === movie._id.toString())
      );

      if (matchedMovies.length > 0) {
        const movieList = matchedMovies
          .map(movie => `${movie.title} - Release Date: ${new Date(movie.releaseDate).toDateString()}`)
          .join('\n');

        const emailContent = `
          Hi ${user.username},
          Here are some upcoming movies you might enjoy based on your favorite genres and actors:

          ${movieList}

          Don't miss out on these releases!
        `;

        // Send email notification
        await emailService.sendEmail(
          user.email,
          'Upcoming Movies Notification',
          emailContent
        );

        console.log(`Notification sent to ${user.email}`);
        notificationsSent++;
      }
    }

    res.status(200).json({ message: `${notificationsSent} notifications sent successfully` });
  } catch (err) {
    console.error('Failed to send notifications:', err.message);
    res.status(500).json({ message: 'Failed to send notifications', error: err.message });
  }
};

// Get Upcoming Movies
exports.getUpcomingMovies = async (req, res) => {
  try {
    const upcomingMovies = await Movie.find({ upcoming: true }).sort('releaseDate');
    res.status(200).json({ upcomingMovies });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get upcoming movies', error: err.message });
  }
};

// Set Reminder for a Movie
exports.setReminder = async (req, res) => {
  try {
    const movieId = req.params.movieId;
    const userId = req.user._id;

    // Logic to set a reminder (e.g., add to a collection or schedule a job)
    // For simplicity, we'll assume reminders are stored in user document
    await User.findByIdAndUpdate(userId, { $addToSet: { reminders: movieId } });

    res.status(200).json({ message: 'Reminder set successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to set reminder', error: err.message });
  }
};
