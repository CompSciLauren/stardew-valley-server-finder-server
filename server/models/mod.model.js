// Model for Mod
// Defines connection methods used for a Mod

const sql = require('./db.js');

// constructor
const Mod = function(mod) {
  this.id = mod.id;
  this.name = mod.username;
  this.desc = mod.desc;
  this.creator = mod.creator;
  this.contact = mod.contact;
  this.lastupdate = mod.lastupdate;
};

Mod.create = (newMod, result) => {
  sql.query('INSERT INTO mod SET ?', newMod, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created Mod: ', { id: res.insertId, ...newMod });
    result(null, { id: res.insertId, ...nMod });
  });
};

Mod.findByID = (ModId, result) => {
  sql.query(`SELECT * FROM mod WHERE id = ?`, ModId, (err, res) => {
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

Mod.getAll = result => {
  sql.query('SELECT * FROM mod', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('Mod: ', res);
    result(null, res);
  });
};

Mod.remove = (id, result) => {
  sql.query('DELETE FROM mod WHERE id = ?', id, (err, res) => {
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

module.exports = Mod;
