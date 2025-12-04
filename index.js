require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // <-- only once
const authRoutes = require('./Src/routes/auth');

const app = express();

app.use(cors({
    origin: [
      'http://localhost:5173',      // Local React (Vite)
      'https://react-task-wjne.vercel.app'  // ✅ Your REAL Vercel link
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }));
  
app.use(cors(corsOptions));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
