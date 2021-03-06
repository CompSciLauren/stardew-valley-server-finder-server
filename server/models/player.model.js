// Model for Player
// Defines connection methods used for a Player

const sql = require('./db.js');

// constructor
const Player = function (player) {
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

Player.updateUsername = (username, playerId, result) => {
  sql.query(
    'UPDATE player SET username = ? WHERE id = ?',
    [username, playerId],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

Player.findByID = (PlayerId, result) => {
  sql.query(
    `SELECT  id5 as id, username, timezone, num_players, platform, mods, notes, status.display as 'status' FROM (SELECT DISTINCT id4 as id5, P3.username, P3.timezone, P3.num_players, P3.platform, P3.mods, P3.notes, status FROM (SELECT id3 as id4, username, timezone, num_players, platform, game_mod.name as 'mods', notes, status FROM (SELECT id2 as id3, username, timezone, num_players, platform.display as 'platform', mods, notes, status FROM (SELECT id as id2, username, timezone, num_players, platform, mods, notes, player_status.status_id as status FROM player
    JOIN player_status
    ON player.id = player_status.player_id
    WHERE id = ?) as P
   JOIN platform
   ON P.platform = platform.id) as P2
   JOIN game_mod
   ON P2.mods = game_mod.id) as P3, player    
   JOIN player_status
    ON player.id = player_status.player_id) as P4
   JOIN status
   ON status.id = P4.status`,
    PlayerId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        res[0].statuses = res.map((player) => player.status);
        delete res[0].status;
        console.log('found Player: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Player with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

Player.getAll = (result) => {
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
