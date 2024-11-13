// routes/newsRoutes.js

const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

/**
 * @swagger
 * tags:
 *   name: News
 *   description: Manage movie-related news
 */

/**
 * @swagger
 * /api/v1/news:
 *   get:
 *     summary: Get all news articles
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news articles
 */

/**
 * @swagger
 * /api/v1/news:
 *   post:
 *     summary: Add a news article (Admin Only)
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: News article added
 */


// Public route to get all news
router.get('/', newsController.getAllNews);

// Admin route to add news
router.post('/', authMiddleware, adminMiddleware, newsController.addNews);

module.exports = router;
