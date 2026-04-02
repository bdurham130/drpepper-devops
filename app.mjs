import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import connectDB from './config/db.mjs';
import pageRoutes from './routes/index.mjs';
import apiRoutes from './routes/api.mjs';

// ---------- Setup ----------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

// ---------- View Engine ----------

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

// ---------- Middleware ----------

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (stores sessions in MongoDB)
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    collectionName: 'sessions'
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// ---------- Routes ----------

app.use('/', pageRoutes);
app.use('/api', apiRoutes);

// ---------- 404 Handler ----------

app.use((req, res) => {
  res.status(404).render('home', {
    title: '404 — Not Found',
    user: req.session?.user || null
  });
});

// ---------- Start Server ----------

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
