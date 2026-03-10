import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFile } from 'fs/promises';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Serve game frontend
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Save score
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentName, keyword } = req.body;
    if (!studentName || !keyword) return res.status(400).json({ error: 'Missing fields' });

    const db = client.db('cis486');
    const collection = db.collection('attendance');

    const result = await collection.insertOne({
      studentName,
      keyword,
      timestamp: new Date()
    });

    res.json({ message: 'Score recorded', id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record score' });
  }
});

// Get leaderboard
app.get('/api/attendance', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('attendance');
    const records = await collection.find({}).sort({ timestamp: -1 }).toArray();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load leaderboard' });
  }
});

// Delete a score
app.delete('/api/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = client.db('cis486');
    const collection = db.collection('attendance');

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });

    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
