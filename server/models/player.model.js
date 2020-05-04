// Model for Player
// Defines connection methods used for a Player

const sql = require('./db.js');

// constructor
const Player = function(player) {
  this.id = player.id;
  this.username = player.username;
  this.timezone = player.timezone;
  this.num_players = player.num_players;
  this.platform = player.platform;
  this.mods = player.mods;
  this.notes = player.notes;
  this.date_modified = player.date_modified;
};

Player.create = (newPlayer, result) => {
  sql.query('INSERT INTO player SET ?', newPlayer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Player: ', { id: res.insertId, ...newPlayer });
    result(null, { id: res.insertId, ...newPlayer });
  });
};

Player.findByID = (PlayerId, result) => {
  sql.query(`SELECT * FROM player WHERE id = ?`, PlayerId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found Player: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found Player with the id
    result({ kind: 'not_found' }, null);
  });
};

Player.getAll = result => {
  sql.query('SELECT * FROM player', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Player: ', res);
    result(null, res);
  });
};

Player.remove = (id, result) => {
  sql.query('DELETE FROM player WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found player with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted Player with id: ', id);
    result(null, res);
  });
};

module.exports = Player;
