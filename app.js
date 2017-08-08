const express = require('express');
const app = express();
const config = require('./app/config/config');

app.use(express.static(__dirname + '/public'));

app.use(require('./app/routing/routes'));

app.listen(config.port);

console.log('App listening on port ' + (process.env.PORT || config.port));
