const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Allow only this origin
    methods: 'GET,POST', // Specify allowed methods
    credentials: true // Enable cookies and other credentials
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Routes
app.use('/api/v1/users', userRoutes);

//Error handling Middleware
app.use(errorHandlingMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
