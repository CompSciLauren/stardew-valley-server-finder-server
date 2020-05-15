// Router
// Grant Stewart

module.exports = (app) => {
  const player = require('../controllers/player.controller.js');

  // Create a new player
  app.post('/api/player', player.create);

  // Update a player's username
  app.post('/api/player/:id', player.updateUsername);

  // Retrieve all players
  app.get('/api/player', player.findAll);

  // Retrieve a single Customer with id
  app.get('/api/player/:id', player.findPlayer);

  // Delete a Customer with id
  app.delete('/api/player/:id', player.delete);
};
