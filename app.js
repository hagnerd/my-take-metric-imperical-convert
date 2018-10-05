const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api');

const app = express();

app.use(helmet.noSniff());
app.use(helmet.xssFilter());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(process.cwd() + '/public'));

app
  .route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

apiRoutes(app);

module.exports = app;

