const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');

const log = (arg) => console.log(arg);

// Initialize the app
const app = express();

// Create a Redis client
const client = redis.createClient();

// Connect the client to the Redis Server
client.on('connect', () => {
  log('Redis Server Connected...');
});

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configuration and dependencies needed for the module to run
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Set a welcome message for the homepage
app.get('/', (_, res) => {
  // render the single view index.ejs from the 'views' folder
  res.render('index');
});

// Start a new server
const port = 3000;
app.listen(port);
log(`Server Started On Port ${port}...`)

module.exports = app;
