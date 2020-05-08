// Router
// Grant Stewart

module.exports = (app) => {
  const playerStatus = require('../controllers/playerStatus.controller.js');

  // Create a new playerStatus
  app.post('/api/playerStatus', playerStatus.create);

  // Retrieve all playerStatus
  app.get('/api/playerStatus', playerStatus.findAll);

  // Retrieve a single Customer with id
  app.get('/api/playerStatus/:id1/:id2', playerStatus.findPlayerStatus);

  // Delete a Customer with id
  app.delete('/api/playerStatus/:id1/:id2', playerStatus.delete);
};
