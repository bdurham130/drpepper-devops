import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema({
  playerName: {
    type: String,
    required: [true, 'Player name is required'],
    trim: true
  },
  moves: {
    type: Number,
    required: [true, 'Move count is required'],
    min: [1, 'Moves must be at least 1']
  },
  difficulty: {
    type: String,
    enum: ['4x4', '6x6'],
    default: '4x4'
  },
  completedAt: {
    type: Date,
    default: Date.now
  }
});

const Score = mongoose.model('Score', scoreSchema);

export default Score;
