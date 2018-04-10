const express = require('express');
const app = express();
var routes = require('./routes/router');
// Use the EJS templating engine
app.set('view engine', 'ejs');
app.use(express.static('resources'));

// Setup routes for express
routes(app);
module.exports = app;
