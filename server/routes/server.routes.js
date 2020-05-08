// Router
// Grant Stewart

module.exports = (app) => {
  const server = require('../controllers/server.controller.js');

  // Create a new server
  app.post('/api/server', server.create);

  // Retrieve all servers
  app.get('/api/server', server.findAll);

  // Retrieve a single Customer with id
  app.get('/api/server/:id', server.findServer);

  // Delete a Customer with id
  app.delete('/api/server/:id', server.delete);
};
