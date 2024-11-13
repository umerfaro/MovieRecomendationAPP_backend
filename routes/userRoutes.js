// routes/userRoutes.js

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management
 */

/**
 * @swagger
 * /api/v1/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 */

/**
 * @swagger
 * /api/v1/users/wishlist:
 *   post:
 *     summary: Add a movie to wishlist
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               movieId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Movie added to wishlist
 */



const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

// Profile Management
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// Wishlist Management
router.post('/wishlist', authMiddleware, userController.addToWishlist);
router.get('/wishlist', authMiddleware, userController.getWishlist);
router.delete('/wishlist/:movieId', authMiddleware, userController.removeFromWishlist);

module.exports = router;
