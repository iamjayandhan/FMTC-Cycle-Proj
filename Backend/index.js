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

// Allowed Origins for CORS
const allowedOrigins = [
    'https://fmtc.vercel.app', // Frontend URL
    'http://localhost:5173',   // Local Frontend (for development)
    'http://localhost:5174'    // Another local Frontend if applicable
];

// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request if origin is allowed
        } else {
            callback(new Error('Not allowed by CORS'), false); // Reject if not allowed
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Content-Type and Authorization
    credentials: true,  // Allow cookies with requests
    preflightContinue: false, // Ensure preflight responses are automatically handled
    optionsSuccessStatus: 204 // For legacy browsers (especially IE)
};

app.use(cors(corsOptions)); // Use the CORS options

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
