const  path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const {errorHanddler} = require('./middleware/errorMiddleware');
// const connectDB = require('./config/db');
const PORT = process.env.PORT;


// Connect to database
// connectDB();
// Create Express server
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Support Ticket API' });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));

// Serve Frontend
// if(process.env.NODE_ENV === 'production') {
//     // Set static folder
//     app.use(express.static(path.join(__dirname, '../frontend/build')));
//     app.get('*', (req, res) => res.sendFile(__dirname, '../' , 'frontend' , 'build' , 'index.html'));
// } else {
//     app.get('/', (req, res) => {
//       res.status(200).json({ message: 'Welcome to the Support Ticket API' });
//     });
// }

app.use(errorHanddler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));