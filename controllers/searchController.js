const Movie = require('../models/movieModel');

exports.searchMovies = async (req, res) => {
  try {
    const {
      title,
      genre,
      director,
      actor,
      ratings,
      releaseYear,
      releaseDecade,
      country,
      language,
      keywords,
      sortBy,
    } = req.query;

    let filters = {};

    // Basic filters
    if (title) filters.title = { $regex: title, $options: 'i' };
    if (genre) filters.genre = { $in: genre.split(',') };
    if (director) filters.director = director;
    if (actor) filters.cast = actor;
    if (ratings) filters.averageRating = { $gte: Number(ratings) };
    
    // Release year filter
    if (releaseYear) {
      const start = new Date(`${releaseYear}-01-01`);
      const end = new Date(`${releaseYear}-12-31`);
      filters.releaseDate = { $gte: start, $lte: end };
    }

    // Release decade filter
    if (releaseDecade) {
      const decadeStart = `${releaseDecade}-01-01`;
      const decadeEnd = `${parseInt(releaseDecade) + 9}-12-31`;
      filters.releaseDate = { $gte: new Date(decadeStart), $lte: new Date(decadeEnd) };
    }

    // Keywords in synopsis
    if (keywords) filters.synopsis = { $regex: keywords, $options: 'i' };

    // Country and language filters
    if (country) filters.country = country;
    if (language) filters.language = language;

    // Sorting options
    let sortOption = {};
    if (sortBy === 'ratings') sortOption = { averageRating: -1 };
    else if (sortBy === 'popularity') sortOption = { ratingsCount: -1 };
    else sortOption = { releaseDate: -1 };

    // Query the database
    const movies = await Movie.find(filters)
      .populate('director cast')
      .sort(sortOption);

    res.status(200).json({ movies });
  } catch (err) {
    res.status(500).json({ message: 'Search failed', error: err.message });
  }
};

// Controller for getting top movies by genre and top movies of the month
exports.getTopMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.query;

    const topMovies = await Movie.find({ genre: { $in: [genre] } })
      .sort('-averageRating')
      .limit(10);

    res.status(200).json({ topMovies });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get top movies by genre', error: err.message });
  }
};

exports.getTopMoviesOfMonth = async (req, res) => {
  try {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const topMovies = await Movie.find({
      releaseDate: {
        $gte: new Date(`${currentYear}-${currentMonth}-01`),
        $lt: new Date(`${currentYear}-${currentMonth + 1}-01`),
      },
    })
      .sort('-averageRating')
      .limit(10);

    res.status(200).json({ topMovies });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get top movies of the month', error: err.message });
  }
};
