const mongoose = require('mongoose');

const boySchema = new mongoose.Schema({
    name: String, 
    uuid: String,
    talk: String,
});

const Boy = new mongoose.model('boys',boySchema);

module.exports = Boy;