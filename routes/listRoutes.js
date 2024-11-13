// routes/listRoutes.js

const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Custom Lists
 *   description: Create and manage custom movie lists
 */

/**
 * @swagger
 * /api/v1/lists:
 *   post:
 *     summary: Create a custom list
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               movies:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Custom list created
 */

/**
 * @swagger
 * /api/v1/lists:
 *   get:
 *     summary: Get all custom lists
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of custom lists
 */

/**
 * @swagger
 * /api/v1/lists/{listId}:
 *   delete:
 *     summary: Delete a custom list
 *     tags: [Custom Lists]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: listId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Custom list deleted
 */


// Create a custom list
router.post('/', authMiddleware, listController.createList);

// Get all custom lists
router.get('/', listController.getLists);

// Follow a custom list
router.post('/:listId/follow', authMiddleware, listController.followList);

module.exports = router;
