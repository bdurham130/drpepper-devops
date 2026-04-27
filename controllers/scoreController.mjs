import Score from '../models/Score.mjs';

// POST /api/scores - Save a new score
export const createScore = async (req, res) => {
  try {
    const { playerName, moves, difficulty } = req.body;

    if (!playerName || !moves) {
      return res.status(400).json({ error: 'Player name and moves are required' });
    }

    const score = await Score.create({
      playerName,
      moves: Number(moves),
      difficulty: difficulty || '4x4'
    });

    res.status(201).json({
      message: 'Score saved',
      score
    });
  } catch (err) {
    console.error('Error saving score:', err.message);
    res.status(500).json({ error: 'Failed to save score' });
  }
};

// GET /api/scores - Get all scores (sorted by fewest moves)
export const getScores = async (req, res) => {
  try {
    const scores = await Score.find({})
      .sort({ moves: 1, completedAt: -1 })
      .limit(50);

    res.json(scores);
  } catch (err) {
    console.error('Error fetching scores:', err.message);
    res.status(500).json({ error: 'Failed to load scores' });
  }
};

// PATCH /api/scores/:id - Update a score
export const updateScore = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    if (typeof req.body.playerName === 'string') {
      const playerName = req.body.playerName.trim();

      if (!playerName) {
        return res.status(400).json({ error: 'Player name is required' });
      }

      updates.playerName = playerName;
    }

    if (req.body.moves !== undefined) {
      const moves = Number(req.body.moves);

      if (!Number.isInteger(moves) || moves < 1) {
        return res.status(400).json({ error: 'Moves must be a whole number greater than 0' });
      }

      updates.moves = moves;
    }

    if (req.body.difficulty !== undefined) {
      const allowedDifficulties = ['4x4', '6x6'];

      if (!allowedDifficulties.includes(req.body.difficulty)) {
        return res.status(400).json({ error: 'Difficulty must be 4x4 or 6x6' });
      }

      updates.difficulty = req.body.difficulty;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid updates provided' });
    }

    const updatedScore = await Score.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true
    });

    if (!updatedScore) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({
      message: 'Score updated',
      score: updatedScore
    });
  } catch (err) {
    console.error('Error updating score:', err.message);
    res.status(500).json({ error: 'Update failed' });
  }
};

// DELETE /api/scores/:id - Delete a score
export const deleteScore = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Score.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ message: 'Score deleted' });
  } catch (err) {
    console.error('Error deleting score:', err.message);
    res.status(500).json({ error: 'Delete failed' });
  }
};
