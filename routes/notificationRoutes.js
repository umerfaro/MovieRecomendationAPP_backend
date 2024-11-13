// routes/notificationRoutes.js

const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notifications and Reminders
 */

/**
 * @swagger
 * /api/v1/notifications/upcoming:
 *   get:
 *     summary: Get upcoming movies
 *     tags: [Notifications]
 *     responses:
 *       200:
 *         description: List of upcoming movies
 */

/**
 * @swagger
 * /api/v1/notifications/reminder/{movieId}:
 *   post:
 *     summary: Set a reminder for a movie
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reminder set successfully
 */


// Get upcoming movies
router.get('/upcoming', notificationController.getUpcomingMovies);

// Route to trigger notifications
router.post('/notify-upcoming', notificationController.notifyUsersAboutUpcomingMovies);

// Set a reminder for a movie
router.post('/reminder/:movieId', authMiddleware, notificationController.setReminder);

module.exports = router;
