// controllers/newsController.js

const News = require('../models/newsModel');

// Get all news articles
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort('-publishedAt');
    res.status(200).json({ news });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get news', error: err.message });
  }
};

// Add a news article (Admin)
exports.addNews = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;
    const newsArticle = await News.create({ title, content, author, tags });
    res.status(201).json({ newsArticle });
  } catch (err) {
    res.status(400).json({ message: 'Failed to add news', error: err.message });
  }
};
