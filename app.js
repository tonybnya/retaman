const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');

// Initialize the app
const app = express();

// View engine setup
app.set('views', path.join(__dirname, (views));
app.set('view engine', 'ejs');

// Configuration and dependencies needed for the module to run
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Start a new server
const port = 3000;
app.listen(port);
console.log(`Server started at port ${port}...`)

module.exports = app;
