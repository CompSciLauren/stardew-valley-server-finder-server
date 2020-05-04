// Router
// Grant Stewart

module.exports = app => {
    const player = require("../controllers/player.controller.js");
  
    // Create a new player
    app.post("/player", player.create);
  
    // Retrieve all players
    app.get("/player", player.findAll);
  
    // Retrieve a single Customer with id
    app.get("/player/:id", player.findPlayer);
  
    // Delete a Customer with id
    app.delete("/player/:id", player.delete);
  

  };