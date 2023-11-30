const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const redis = require('redis');

// Initialize the app
const app = express();

// Create a Redis client
const client = redis.createClient();
// Connect the app through the Redis client
client.on('connect', () => {
  console.log('Redis Server Connected...');
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
  const title = 'Redis Task Manager';

  // Fetch all the items in the 'tasks' list
  client.lRange('tasks', 0, -1, (err, reply) => {
    res.render('index', {
      title: title,
      tasks: reply
    });
  });
});

// Set a port
const port = 3000;
// Start a new server
app.listen(port);
console.log(`Server Started On Port ${port}...`);

module.exports = app;
