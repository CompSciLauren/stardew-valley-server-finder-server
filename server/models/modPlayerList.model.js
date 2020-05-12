//Player List
const sql = require('./db.js');

// constructor
const PlayerList = function(listItem) {
  this.username = listItem.id;
  this.timezone = listItem.name;
  this.num_players = listItem.desc;
  this.platform = listItem.creator;
  this.mods = listItem.contact;
  this.notes = listItem.lastupdate;
};

PlayerList.getPlayerList = (id, result) => {
  var xo = 'SELECT username, timezone, num_players, platform, mods, notes FROM player, game_mod WHERE id = ';
  var yo = ' AND mods = id AND mods > 0';
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
