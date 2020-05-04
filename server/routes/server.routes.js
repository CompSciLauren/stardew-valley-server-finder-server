// Router
// Grant Stewart

module.exports = app => {
    const server = require("../controllers/server.controller.js");
  
    // Create a new server
    app.post("/server", server.create);
  
    // Retrieve all servers
    app.get("/server", server.findAll);
  
    // Retrieve a single Customer with id
    app.get("/server/:id", server.findServer);
  
    // Delete a Customer with id
    app.delete("/server/:id", server.delete);
  

  };