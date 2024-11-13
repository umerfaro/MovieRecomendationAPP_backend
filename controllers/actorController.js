// controllers/actorController.js

const Actor = require('../models/actorModel');

exports.addActor = async (req, res) => {
  try {
    const actor = await Actor.create(req.body);
    res.status(201).json({ actor });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add actor', error: err.message });
  }
};

exports.getAllActors = async (req, res) => {
  try {
    const actors = await Actor.find();
    res.status(200).json({ actors });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get actors', error: err.message });
  }
};
