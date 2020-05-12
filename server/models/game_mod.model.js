// Model for Mod
// Defines connection methods used for a Mod

const sql = require('./db.js');

// constructor
const Game_Mod = function(game_mod) {
  this.id = game_mod.id;
  this.name = game_mod.name;
  this.desc = game_mod.desc;
  this.creator = game_mod.creator;
  this.contact = game_mod.contact;
  this.lastupdate = game_mod.lastupdate;
};

Game_Mod.create = (newMod, result) => {
  sql.query('INSERT INTO game_mod SET ?', newMod, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Mod: ', { id: res.insertId, ...newMod });
    result(null, { id: res.insertId, ...newMod });
  });
};

Game_Mod.findByID = (ModId, result) => {
  sql.query(`SELECT * FROM game_mod WHERE id = ?`, ModId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found Mod: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Mod with the id
    result({ kind: 'not_found' }, null);
  });
};

Game_Mod.getAll = result => {
  sql.query('SELECT * FROM game_mod', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Mod: ', res);
    result(null, res);
  });
};

Game_Mod.remove = (id, result) => {
  sql.query('DELETE FROM game_mod WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Mod with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted Mod with id: ', id);
    result(null, res);
  });
};

Game_Mod.getPlayerList = (id, result) => {
  sql.query('SELECT username, timezone, num_players, platform, mods, notes FROM player, game_mod WHERE id = ?, mods = id AND mods > 0', id, (err, res) => {
    if(err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('ModList: ', res);
    result(null, res);
  });
};

module.exports = Game_Mod;
