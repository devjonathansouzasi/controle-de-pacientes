const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/**
 * Getting express instace
 */
const app = express();

/**
 * Enable cross origin requests
 */
app.use(cors());

/**
 * Enable corversion of body requests to json
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Enable logger module
 */
require("./modules/logger")(app);

/**
 * Set api Routes
 */
require("./app/routes/index")(app);

/**
 * Run server
 */
app.listen(3333);
