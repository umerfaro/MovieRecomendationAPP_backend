
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Movie Search
 */

/**
 * @swagger
 * /api/v1/search:
 *   get:
 *     summary: Search for movies
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: ratings
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: List of movies matching search criteria
 */


// Search movies with filters
router.get('/', searchController.searchMovies);

// Get top 10 movies by genre
router.get('/top-genre', searchController.getTopMoviesByGenre);

// Get top movies of the month
router.get('/top-month', searchController.getTopMoviesOfMonth);

module.exports = router;
