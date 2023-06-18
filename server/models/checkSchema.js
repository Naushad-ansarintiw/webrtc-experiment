const mongoose = require('mongoose');

const checkSchema = new mongoose.Schema({
    uuid: String,
});

const Check = new mongoose.model('checks',checkSchema);

module.exports = Check;