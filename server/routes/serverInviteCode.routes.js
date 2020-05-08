// Router
// Grant Stewart

module.exports = (app) => {
  const serverInviteCode = require('../controllers/serverInviteCode.controller.js');

  // Create a new serverInviteCode
  app.post('/api/serverInviteCode', serverInviteCode.create);

  // Retrieve all serverInviteCodes
  app.get('/api/serverInviteCode', serverInviteCode.findAll);

  // Retrieve a single server with id
  app.get('/api/serverInviteCode/:id', serverInviteCode.findServerInviteCode);

  // Delete a server with id
  app.delete('/api/serverInviteCode/:id', serverInviteCode.delete);
};
