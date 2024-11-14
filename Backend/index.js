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
    origin: 'https://fmtc.vercel.app',  // The frontend URL
    methods: ['GET', 'POST', 'PUT', 'OPTIONS'],
    credentials: true,  // Allows cookies and headers for cross-origin requests
    allowedHeaders: ['Content-Type', 'Authorization'],  // Explicitly set allowed headers
}));

// Manually handle preflight requests
app.options('*', cors());  // Enables CORS for preflight OPTIONS requests


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
