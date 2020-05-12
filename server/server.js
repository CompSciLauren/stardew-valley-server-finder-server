// Rest API - starts server on port 3000
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Star Dew Valley Server Finder!' });
});

require('./routes/player.routes.js')(app);
require('./routes/playerServer.routes.js')(app);
require('./routes/playerStatus.routes.js')(app);
require('./routes/server.routes.js')(app);
require('./routes/serverInviteCode.routes.js')(app);
require('./routes/game_mod.routes.js')(app);

const PORT = process.env.PORT || 8081;

// set port, listen for requests
app.listen(PORT, () => {
  console.log('Server is running on port 8081.');
});

// use - localhost:8081/ - when connecting

// a comment
