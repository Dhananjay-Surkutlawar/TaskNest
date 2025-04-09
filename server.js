const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('🚀 Welcome to TaskNest API!');
});

// Routes
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes'); // optional, if using auth

app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes); // optional

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
