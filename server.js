const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

//Import routes
const authRoute = require('./routes/authentification')

//Middleware 
app.use(express.json());

//Route Middlewares
app.use('/api/user', authRoute);

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected')
);

app.listen(3000, () => console.log('Server Up and running'))