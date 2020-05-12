//Player List
const sql = require('./db.js');

// constructor
const PlayerList = function(listItem) {
  this.username = listItem.username;
  this.timezone = listItem.timezone;
  this.num_players = listItem.num_players;
  this.platform = listItem.platform;
  this.mods = listItem.mods;
  this.notes = listItem.notes;
};

PlayerList.getPlayerList = (id, result) => {
<<<<<<< HEAD
  var xo = 'SELECT username, timezone, num_players, platform, mods, notes FROM player, game_mod WHERE game_mod.id = ';
  var yo = 'AND mods = game_mod.id AND mods > 0';
=======
  var xo = 'SELECT username, timezone, num_players, platform, mods, notes FROM player, game_mod WHERE id = ';
  var yo = ' AND mods = id AND mods > 0';
>>>>>>> de7ec092006bcb75996734585a44c36ba1b252f0
  var test = xo + id + yo;
  sql.query(test, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('ModList: ', res);
    result(null, res);
  });
};

module.exports = PlayerList;
