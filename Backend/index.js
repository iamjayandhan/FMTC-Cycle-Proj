const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const standRoutes = require('./routes/standRoutes');
const cycleRoutes = require('./routes/cycleRoutes');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

require('./utils/dbOnWatch')();

const app = express();

// Allowed Origins for CORS
const allowedOrigins = [
    'https://fmtc.vercel.app', // Frontend URL
    'http://localhost:5173',   // Local Frontend (for development)
    'http://localhost:5174'    // Another local Frontend if applicable
];

// CORS Configuration
const corsOptions = {
    origin: ['https://fmtc.vercel.app'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Allows cookies to be sent
    allowedHeaders: ['Content-Type', 'Authorization']
};


// Apply Helmet middleware for security headers
app.use(helmet());

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Preflight handling for API routes (allow preflight OPTIONS requests)
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*'); // Dynamically set the origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials like cookies
    res.sendStatus(200);
});

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
