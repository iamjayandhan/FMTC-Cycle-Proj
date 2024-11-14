const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const standRoutes = require('./routes/standRoutes');
const cycleRoutes = require('./routes/cycleRoutes');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

require('./utils/dbOnWatch')();

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'https://fmtc.vercel.app', // Frontend origin
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'], // Include OPTIONS for preflight
    credentials: true, // Allow credentials (cookies)
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow necessary headers
}));

// Preflight request handling
app.options('*', cors()); // Handle preflight CORS requests


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stands', standRoutes);
app.use('/api/v1/cycles', cycleRoutes);

// Error handling middleware
app.use(errorHandlingMiddleware);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
