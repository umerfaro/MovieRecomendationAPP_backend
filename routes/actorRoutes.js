// routes/actorRoutes.js

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User Authentication
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */



const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actorController');

// Route to add a new actor (POST /api/v1/actors)
router.post('/', actorController.addActor);

// Route to get all actors (GET /api/v1/actors)
router.get('/', actorController.getAllActors);

module.exports = router;
