// models/userModel.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Import the Actor model to ensure it's registered
const Actor = require('./actorModel');

// Import other referenced models
const Movie = require('./movieModel');
const CustomList = require('./customListModel')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    preferences: {
      genres: [String],
      actors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Actor' }],
    },    
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }], // Ensure ObjectId type
    customLists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomList' }],
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Password hashing middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Password comparison method
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

module.exports = mongoose.model('User', userSchema);
