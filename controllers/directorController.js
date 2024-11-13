// controllers/directorController.js

const Director = require('../models/directorModel');

exports.addDirector = async (req, res) => {
  try {
    const director = await Director.create(req.body);
    res.status(201).json({ director });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add director', error: err.message });
  }
};
