// controllers/listController.js

const CustomList = require('../models/customListModel');

// Create a new custom list
exports.createList = async (req, res) => {
  try {
    const { name, description, movies } = req.body;
    const customList = await CustomList.create({
      user: req.user._id,
      name,
      description,
      movies,
    });
    res.status(201).json({ customList });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create list', error: err.message });
  }
};

// Get all custom lists
exports.getLists = async (req, res) => {
  try {
    const lists = await CustomList.find().populate('movies user', 'username');
    res.status(200).json({ lists });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve lists', error: err.message });
  }
};

// Follow a custom list
exports.followList = async (req, res) => {
  try {
    const listId = req.params.listId;
    const userId = req.user._id;

    const list = await CustomList.findByIdAndUpdate(
      listId,
      { $addToSet: { followers: userId } },
      { new: true }
    );

    res.status(200).json({ list });
  } catch (err) {
    res.status(400).json({ message: 'Failed to follow list', error: err.message });
  }
};
