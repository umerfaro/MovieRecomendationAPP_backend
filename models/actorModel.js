// models/actorModel.js

const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    biography: String,
    filmography: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
    awards: [String],
  },
  { timestamps: true }
);

const Actor = mongoose.model('Actor', actorSchema);

module.exports = Actor;
