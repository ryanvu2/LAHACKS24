require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const cors = require('cors');

// Express app
const app = express();

// Middleware
app.use(express.json()); // Parses JSON bodies

// CORS Configuration: Allow only the frontend origin for security
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// Routes
app.use('/api/users', userRoutes);

// Connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(4000, () => {
            console.log("listening on port 4000");
        });
    })
    .catch((error) => {
        console.log(error);
    });
