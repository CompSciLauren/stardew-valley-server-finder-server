// Router
// Grant Stewart

module.exports = app => {
    const player = require("../controllers/playerServer.controller.js");
  
    // Create a new player
    app.post("/playerServer", player.create);
  
    // Retrieve all players
    app.get("/playerServer", player.findAll);
  
    // Retrieve a single Customer with id
    app.get("/playerServer/:id", player.findPlayerServer);
  
    // Delete a Customer with id
    app.delete("/playerServer/:id", player.delete);
  

  };