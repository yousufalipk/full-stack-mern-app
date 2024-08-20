const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const user = require ('./Routes/userRoutes');

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

const app = express();

// CORS configuration
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true
}));

app.use(bodyParser.json()); 
app.use(cookieParser());    

// Test route
app.get('/', (req, res) => {
    res.send('Server Runs Correctly');
});

app.use('/api/v1', user);


module.exports = app;
