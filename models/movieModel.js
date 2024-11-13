// models/movieModel.js

const mongoose = require('mongoose');
const Director = require('./directorModel');
const Actor = require('./actorModel');

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: [String],
    director: { type: mongoose.Schema.Types.ObjectId, ref: 'Director' },
    cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    releaseDate: Date,
    runtime: Number,
    synopsis: String,
    trivia: [String],
    goofs: [String],
    soundtrack: [String],
    ageRating: String,
    parentalGuidance: String,
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    boxOffice: {
      openingWeekend: Number,
      totalEarnings: Number,
      internationalRevenue: Number,
    },
    awards: [String],
    upcoming: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Movie', movieSchema);
