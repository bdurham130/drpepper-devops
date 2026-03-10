```javascript
import 'dotenv/config';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Validate Mongo URI
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("ERROR: MONGO_URI environment variable is missing.");
  process.exit(1);
}

// MongoDB Client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

// Connect to MongoDB
async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

await connectDB();

// Middleware
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Save attendance
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentName, keyword } = req.body;

    if (!studentName || !keyword) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const db = client.db('cis486');
    const collection = db.collection('attendance');

    const result = await collection.insertOne({
      studentName,
      keyword,
      timestamp: new Date()
    });

    res.json({
      message: 'Attendance recorded',
      id: result.insertedId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to record attendance' });
  }
});

// Get attendance records
app.get('/api/attendance', async (req, res) => {
  try {
    const db = client.db('cis486');
    const collection = db.collection('attendance');

    const records = await collection
      .find({})
      .sort({ timestamp: -1 })
      .toArray();

    res.json(records);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load records' });
  }
});

// Delete record
app.delete('/api/attendance/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const db = client.db('cis486');
    const collection = db.collection('attendance');

    const result = await collection.deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }

    res.json({ message: 'Record deleted' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```
