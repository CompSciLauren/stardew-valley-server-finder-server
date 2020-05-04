// Model for playerServer
// Defines connection methods used for a playerServer

const sql = require('./db.js');

// constructor
const PlayerServer = function(playerServer) {
  this.player_id = playerServer.player_id;
  this.server_id = playerServer.server_id;
};

PlayerServer.create = (newplayerServer, result) => {
  sql.query('INSERT INTO playerServer SET ?', newplayerServer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created playerServer: ', { id: res.insertId, ...newplayerServer });
    result(null, { id: res.insertId, ...newplayerServer });
  });
};

PlayerServer.findByID = (playerServerId, result) => {
  sql.query(`SELECT * FROM player_server WHERE player_id = ?`, playerServerId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found playerServer: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found playerServer with the id
    result({ kind: 'not_found' }, null);
  });
};

PlayerServer.getAll = result => {
  sql.query('SELECT * FROM player_server', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('playerServer: ', res);
    result(null, res);
  });
};

PlayerServer.remove = (id, result) => {
  sql.query('DELETE FROM playerServer WHERE player_id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found playerServer with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted playerServer with player_id: ', id);
    result(null, res);
  });
};

module.exports = PlayerServer;
