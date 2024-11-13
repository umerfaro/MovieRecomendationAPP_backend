// routes/movieRoutes.js

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Movie Management
 */

/**
 * @swagger
 * /api/v1/movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of movies
 */

/**
 * @swagger
 * /api/v1/movies/{movieId}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie details
 */


const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

// Public Routes
router.get('/', movieController.getAllMovies);
router.get('/:movieId', movieController.getMovieById);

// Admin Routes
router.post('/', authMiddleware, adminMiddleware, movieController.addMovie);
router.put('/:movieId', authMiddleware, adminMiddleware, movieController.updateMovie);
router.delete('/:movieId', authMiddleware, adminMiddleware, movieController.deleteMovie);

module.exports = router;
