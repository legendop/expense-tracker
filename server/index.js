const express = require('express');
const app = express();
const db = require('./config/mongoose');
const cors = require('cors');
const { config } = require('dotenv').config({path: "./config/config.env"});



//compatible for the cross origin
app.use(cors());
app.use(express.json());
// use express router
app.use('/api', require('./routes'));

// server start here 
app.listen(process.env.port, function(err){
    if(err){
        console.log("Error", err);
    }
    console.log("Server running on port::"+process.env.port);
});