// routes/directorRoutes.js

const express = require('express');
const router = express.Router();
const directorController = require('../controllers/directorController');

/**
 * @swagger
 * tags:
 *   name: Directors
 *   description: Manage directors and their movies
 */

/**
 * @swagger
 * /api/v1/directors:
 *   get:
 *     summary: Get all directors
 *     tags: [Directors]
 *     responses:
 *       200:
 *         description: List of directors
 */

/**
 * @swagger
 * /api/v1/directors:
 *   post:
 *     summary: Add a new director (Admin only)
 *     tags: [Directors]
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
 *               biography:
 *                 type: string
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Director added successfully
 */

/**
 * @swagger
 * /api/v1/directors/{directorId}:
 *   get:
 *     summary: Get a director by ID
 *     tags: [Directors]
 *     parameters:
 *       - in: path
 *         name: directorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director details
 */

/**
 * @swagger
 * /api/v1/directors/{directorId}:
 *   put:
 *     summary: Update a director (Admin only)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: directorId
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
 *               name:
 *                 type: string
 *               biography:
 *                 type: string
 *     responses:
 *       200:
 *         description: Director updated successfully
 */

/**
 * @swagger
 * /api/v1/directors/{directorId}:
 *   delete:
 *     summary: Delete a director (Admin only)
 *     tags: [Directors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: directorId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Director deleted successfully
 */



// Add a new director (Admin Only)
router.post('/', directorController.addDirector);

module.exports = router;
