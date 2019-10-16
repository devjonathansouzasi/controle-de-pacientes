const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/**
 * Getting config values from json file
 */
const db = require('../config/db.json');

/**
 * Initialize database connection
 */
mongoose.connect(db.mongoURI, { useNewUrlParser: true });

mongoose.plugin(uniqueValidator);

module.exports = mongoose;
