require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Src/routes/auth');

const app = express();

// ✅ CORRECT CORS (ONLY ONCE)
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://react-task-wjne.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(cors())

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);

// ✅ Port
const PORT = process.env.PORT || 5000;

// ✅ DB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
