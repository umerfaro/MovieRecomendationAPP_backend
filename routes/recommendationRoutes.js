// routes/recommendationRoutes.js


/**
 * @swagger
 * tags:
 *   name: Recommendations
 *   description: Personalized movie recommendations
 */

/**
 * @swagger
 * /api/v1/recommendations:
 *   get:
 *     summary: Get personalized movie recommendations
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recommended movies
 */


const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get personalized recommendations
router.get('/', authMiddleware, recommendationController.getRecommendations);

module.exports = router;
