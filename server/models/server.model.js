// Model for Server
// Defines connection methods used for a Server

const sql = require('./db.js');

// constructor
const Server = function(Server) {
  this.player_id = Server.player_id;
  this.server_id = Server.server_id;
};

Server.create = (newServer, result) => {
  sql.query('INSERT INTO server SET ?', newServer, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created server: ', { id: res.insertId, ...newServer });
    result(null, { id: res.insertId, ...newServer });
  });
};

Server.findByID = (serverId, result) => {
  sql.query(`SELECT * FROM server WHERE id = ?`, serverId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found server: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found server with the id
    result({ kind: 'not_found' }, null);
  });
};

Server.getAll = result => {
  sql.query('SELECT * FROM server', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('server: ', res);
    result(null, res);
  });
};

Server.remove = (id, result) => {
  sql.query('DELETE FROM server WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found server with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted server with id: ', id);
    result(null, res);
  });
};

module.exports = Server;
