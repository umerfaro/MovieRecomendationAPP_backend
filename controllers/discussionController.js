const Discussion = require('../models/discussionModel');

// Get all discussions
exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate('user movie')
      .sort('-createdAt');
    res.status(200).json({ discussions });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get discussions', error: err.message });
  }
};

// Create a new discussion
exports.createDiscussion = async (req, res) => {
  try {
    const { title, content, movie, genre, tags } = req.body;
    const userId = req.user._id;

    const newDiscussion = new Discussion({
      title,
      content,
      user: userId,
      movie,
      genre,
      tags,
    });

    await newDiscussion.save();
    res.status(201).json({ message: 'Discussion created successfully', discussion: newDiscussion });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create discussion', error: err.message });
  }
};

// Add a reply to a discussion
exports.addReply = async (req, res) => {
  try {
    const { discussionId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const discussion = await Discussion.findByIdAndUpdate(
      discussionId,
      { $push: { replies: { user: userId, content } } },
      { new: true }
    ).populate('user replies.user');

    res.status(200).json({ message: 'Reply added successfully', discussion });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add reply', error: err.message });
  }
};
