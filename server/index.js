const express = require('express');
const connectDB = require('./config/db.js');
require('dotenv').config();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', adminRoutes);


connectDB();

// Server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
