require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Src/routes/auth');

const app = express();

// Configure CORS to allow your frontend
const corsOptions = {
    origin: ['https://react-task-7yyb.vercel.app', 'http://localhost:3000'],
    credentials: true,
  };
  
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
