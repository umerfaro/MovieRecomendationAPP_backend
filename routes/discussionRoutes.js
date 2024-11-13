const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middlewares/authMiddleware');


/**
 * @swagger
 * tags:
 *   name: Discussions
 *   description: Community discussion boards
 */

/**
 * @swagger
 * /api/v1/discussions:
 *   post:
 *     summary: Create a new discussion
 *     tags: [Discussions]
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
 *               movie:
 *                 type: string
 *               genre:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Discussion created
 */

/**
 * @swagger
 * /api/v1/discussions/{discussionId}/reply:
 *   post:
 *     summary: Add a reply to a discussion
 *     tags: [Discussions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: discussionId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reply added
 */


// Get all discussions
router.get('/', discussionController.getDiscussions);

// Create a new discussion
router.post('/', authMiddleware, discussionController.createDiscussion);

// Add a reply to a discussion
router.post('/:discussionId/reply', authMiddleware, discussionController.addReply);

module.exports = router;
