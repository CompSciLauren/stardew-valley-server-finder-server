// Model for Server Invite Code
// Defines connection methods used for a Server Invite Code

const sql = require('./db.js');

// constructor
const ServerInviteCode = function(code) {
  this.server_id = code.server_id;
  this.invite_code = code.invite_code;
};

ServerInviteCode.create = (newServerInviteCode, result) => {
  sql.query('INSERT INTO server_invite_code SET ?', newServerInviteCode, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created ServerInviteCode: ', { id: res.insertId, ...newServerInviteCode });
    result(null, { id: res.insertId, ...newServerInviteCode });
  });
};

ServerInviteCode.findByID = (ServerInviteCodeId, result) => {
  sql.query(`SELECT * FROM server_invite_code WHERE server_id = ?`, ServerInviteCodeId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found ServerInviteCode: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found ServerInviteCode with the id
    result({ kind: 'not_found' }, null);
  });
};

ServerInviteCode.getAll = result => {
  sql.query('SELECT * FROM server_invite_code', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('ServerInviteCode: ', res);
    result(null, res);
  });
};

ServerInviteCode.remove = (id, result) => {
  sql.query('DELETE FROM server_invite_code WHERE server_id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found ServerInviteCode with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted ServerInviteCode with id: ', id);
    result(null, res);
  });
};

module.exports = ServerInviteCode;
