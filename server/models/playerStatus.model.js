// Model for PlayerStatus
// Defines connection methods used for a PlayerStatus

const sql = require('./db.js');

// constructor
const PlayerStatus = function(pStat) {
  this.player_id = pStat.player_id;
  this.status_id = pStat.status_id
};

PlayerStatus.create = (newPlayerStatus, result) => {
  sql.query('INSERT INTO player_status SET ?', newPlayerStatus, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created PlayerStatus: ', { id: res.insertId, ...newPlayerStatus });
    result(null, { id: res.insertId, ...newPlayerStatus });
  });
};

PlayerStatus.findByID = (PlayerStatusId, statusid, result) => {
  let vals = [PlayerStatusId, statusid];
  sql.query(`SELECT * FROM player_status WHERE player_id = ? AND status_id = ?`, vals, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found PlayerStatus: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found PlayerStatus with the id
    result({ kind: 'not_found' }, null);
  });
};

PlayerStatus.getAll = result => {
  sql.query('SELECT * FROM player_status', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('PlayerStatus: ', res);
    result(null, res);
  });
};

PlayerStatus.remove = (id, id2, result) => {
  let vals = [id, id2];
  sql.query('DELETE FROM player_status WHERE player_id = ? AND status_id = ?', vals, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found PlayerStatus with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted player_status where player_id: ', id);
    result(null, res);
  });
};

module.exports = PlayerStatus;

