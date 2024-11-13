const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const standRoutes = require('./routes/standRoutes');
const cycleRoutes = require('./routes/cycleRoutes');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

require('./utils/dbOnWatch')()

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,POST,PUT', // Specify allowed methods
    credentials: true // Enable cookies and other credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/stands', standRoutes);
app.use('/api/v1/cycles', cycleRoutes);

//Error handling Middleware
app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
