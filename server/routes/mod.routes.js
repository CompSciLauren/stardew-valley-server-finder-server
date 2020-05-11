// Router
// Shogun Thomas

module.exports = (app) => {
    const mod = require('../controllers/mod.controller.js');
  
    // Create a new mod
    app.post('/api/mod', mod.create);
  
    // Retrieve all mods
    app.get('/api/mod', mod.findAll);
  
    // Retrieve a single Customer with id
    app.get('/api/mod/:id', mod.findmod);
  
    // Delete a Customer with id
    app.delete('/api/mod/:id', mod.delete);
  };
  