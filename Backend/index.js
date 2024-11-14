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
// CORS middleware options
const corsOptions = {
    origin: 'https://fmtc.vercel.app',  // Allow only the frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,  // Allow cookies to be sent with requests (if needed)
    allowedHeaders: ['Content-Type', 'Authorization']  // Ensure correct headers are allowed
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));  // Allow preflight for all routes


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
