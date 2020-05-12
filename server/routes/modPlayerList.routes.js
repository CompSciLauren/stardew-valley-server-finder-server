// PlayerList route
module.exports = (app) => {

    const mod_players = require('../controllers/modPlayerList.controller.js');
    app.get('/api/mod_players/:id', mod_players.getPlayerwithModList);
    
  };
