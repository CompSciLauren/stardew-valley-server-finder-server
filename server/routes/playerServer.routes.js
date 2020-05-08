// Router
// Grant Stewart

module.exports = (app) => {
  const player = require('../controllers/playerServer.controller.js');

  // Create a new player
  app.post('/api/playerServer', player.create);

  // Retrieve all players
  app.get('/api/playerServer', player.findAll);

  // Retrieve a single Customer with id
  app.get('/api/playerServer/:id', player.findPlayerServer);

  // Delete a Customer with id
  app.delete('/api/playerServer/:id', player.delete);
};
