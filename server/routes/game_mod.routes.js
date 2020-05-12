// Router
// Shogun Thomas

module.exports = (app) => {
    const game_mod = require('../controllers/game_mod.controller.js');
  
    // Create a new game_mod
    app.post('/api/game_mod', game_mod.create);
  
    // Retrieve all mods
    app.get('/api/game_mod', game_mod.findAll);
  
    // Retrieve a single Customer with id
    app.get('/api/game_mod/:id', game_mod.findMod);
  
    // Delete a Customer with id
    app.delete('/api/game_mod/:id', game_mod.delete);
    
  };
  