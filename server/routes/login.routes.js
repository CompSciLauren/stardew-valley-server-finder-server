// Router
module.exports = (app) => {
  const login = require('../controllers/login.controller.js');

  // Create a new player
  app.post('/api/login', login.validateCredentials);

  // Update a player's password
  app.post('/api/login/:id', login.updatePassword);
};
