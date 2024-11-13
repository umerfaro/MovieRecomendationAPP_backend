// routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware);
router.use(adminMiddleware);

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin functionalities (restricted to admin users)
 */

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Get a list of all users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 */

/**
 * @swagger
 * /api/v1/admin/users/{userId}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 */

/**
 * @swagger
 * /api/v1/admin/movies:
 *   get:
 *     summary: Get all movies (Admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all movies
 */


// Admin-specific routes
router.get('/stats', adminController.getSiteStatistics);

module.exports = router;
