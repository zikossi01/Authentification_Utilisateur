const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const port = 5000;

// Middleware
app.use(express.json()); // To parse JSON requests
app.use(cors()); // Enable Cross-Origin Resource Sharing

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/auth', authRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port :${port}`);
});
