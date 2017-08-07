const express = require('express');
const app = express();
const config = require('./app/config/config');

app.use(express.static(__dirname + '/public'));

app.

app.listen(config.port);

console.log('App listening on port ' + config.port);
