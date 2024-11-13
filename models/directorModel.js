// models/directorModel.js

const mongoose = require('mongoose');

const directorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    biography: String,
    filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    awards: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Director', directorSchema);
