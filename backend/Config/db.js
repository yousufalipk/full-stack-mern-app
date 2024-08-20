const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_DB_URL = process.env.MONGO_DB_URL;

const connectToDb = () => {
    mongoose.connect(MONGO_DB_URL)
    .then((val)=>{
        console.log("Database Connection Successful!");
    })
    .catch((val)=> {
        console.log("Mongodb URI ", MONGO_DB_URL);
        console.log("Database Connection Faliure!");
    })
}

module.exports = connectToDb;