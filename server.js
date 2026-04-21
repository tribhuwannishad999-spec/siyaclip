require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allows your SiyaClip frontend to connect

// Routes
app.use('/api/auth', authRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ SiyaClip DB Connected'))
    .catch(err => console.error('❌ Connection Error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
