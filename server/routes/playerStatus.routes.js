// Router
// Grant Stewart

module.exports = app => {
    const playerStatus = require("../controllers/playerStatus.controller.js");
  
    // Create a new playerStatus
    app.post("/playerStatus", playerStatus.create);
  
    // Retrieve all playerStatus
    app.get("/playerStatus", playerStatus.findAll);
  
    // Retrieve a single Customer with id
    app.get("/playerStatus/:id1/:id2", playerStatus.findPlayerStatus);
  
    // Delete a Customer with id
    app.delete("/playerStatus/:id1/:id2", playerStatus.delete);
  

  };