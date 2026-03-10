import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// MongoDB
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// Serve main game page
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Optional: Serve injected content
app.get('/inject', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// API to create/save a player's score
app.post('/api/scores', async (req, res) => {
  try {
    const { playerName, score } = req.body;
    if (!playerName || score == null) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const db = client.db('memory_game');
    const collection = db.collection('scores');

    const result = await collection.insertOne({
      playerName,
      score,
      timestamp: new Date()
    });

    res.json({ message: 'Score recorded', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record score' });
  }
});

// API to read all scores
app.get('/api/scores', async (req, res) => {
  try {
    const db = client.db('memory_game');
    const collection = db.collection('scores');

    const records = await collection.find({}).sort({ score: -1 }).toArray();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read scores' });
  }
});

// Update a score
app.put('/api/scores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { playerName, score } = req.body;

    const db = client.db('memory_game');
    const collection = db.collection('scores');

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { playerName, score } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ message: 'Score updated' });
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

// Delete a score
app.delete('/api/scores/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const db = client.db('memory_game');
    const collection = db.collection('scores');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Score not found' });
    }

    res.json({ message: 'Score deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Memory game server running on http://localhost:3000');
});
