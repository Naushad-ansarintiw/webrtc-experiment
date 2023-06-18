const mongoose = require('mongoose');

const girlSchema = new mongoose.Schema({
    name: String, 
    uuid: String,
    talk: String,
});

const Girl = new mongoose.model('girls',girlSchema);

module.exports = Girl;