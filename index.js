const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require('./config/dbConnection');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const port = process.env.PORT || 5000;

// DB Connection
connectDb();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/voting', require('./routes/votingRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));

// Error Handler (last)
app.use(errorHandler);

// Start Server
app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
