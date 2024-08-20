const express = require('express');
const dotenv = require('dotenv');
const connectToDb = require('./Config/db');
const app = require('./app');


dotenv.config({path: '.env'});

//Db Connection
connectToDb();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



