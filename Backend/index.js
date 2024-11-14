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


const allowedOrigins = [
    'https://fmtc.vercel.app', // Frontend 1
    'http://localhost:5173', // Frontend 2
    'http://localhost:5174', // Frontend 2' // Frontend 3
];
// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is in the allowed origins list
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true); // Allow the request
        } else {
            callback(new Error('Not allowed by CORS'), false); // Reject the request
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
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
