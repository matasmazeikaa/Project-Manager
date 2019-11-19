const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
dotenv.config();

//Import routes
const authRoute = require('./routes/users')
const projectsRote = require('./routes/projects');
//Middleware 
app.use(express.json());
app.use(cors());

//Route Middlewares
app.use('/api/user', authRoute);
app.use('/api/projects', projectsRote)

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('connected')
);

app.listen(3000, () => console.log('Server Up and running'))