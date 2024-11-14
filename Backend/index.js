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

const corsOptions = {
    origin: [
        'https://amazing-melba-61b994.netlify.app/',
        'https://fmtc.vercel.app',           // Frontend URL
        'http://localhost:5173',             // Local frontend (Vite)           // Another local frontend (if applicable)      // Your backend server on local network (adjust as needed)
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allows cookies to be sent with requests
};

// Apply CORS middleware globally in your Express app
app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stands', standRoutes);
app.use('/api/v1/cycles', cycleRoutes);

// Error handling middleware
app.use(errorHandlingMiddleware);

// Make sure your server is listening on all network interfaces
app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${process.env.PORT}`);
});

