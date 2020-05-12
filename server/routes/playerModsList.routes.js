// PlayerList route
module.exports = (app) => {

    const player_mod = require('../controllers/playerModsList.controller.js');
    app.get('/api/player_mods/:id', player_mod.getPlayerwithModList);
    
  };
