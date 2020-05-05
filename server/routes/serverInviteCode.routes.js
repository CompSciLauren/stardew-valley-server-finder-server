// Router
// Grant Stewart

module.exports = app => {
    const serverInviteCode = require("../controllers/serverInviteCode.controller.js");
  
    // Create a new serverInviteCode
    app.post("/serverInviteCode", serverInviteCode.create);
  
    // Retrieve all serverInviteCodes
    app.get("/serverInviteCode", serverInviteCode.findAll);
  
    // Retrieve a single server with id
    app.get("/serverInviteCode/:id", serverInviteCode.findServerInviteCode);
  
    // Delete a server with id
    app.delete("/serverInviteCode/:id", serverInviteCode.delete);
  

  };