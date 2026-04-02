import Score from '../models/Score.mjs';

// POST /api/scores — Save a new score
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

// GET /api/scores — Get all scores (sorted by fewest moves)
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

// DELETE /api/scores/:id — Delete a score
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
