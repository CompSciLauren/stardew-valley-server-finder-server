const sql = require('./db.js');

// constructor
const Login = function (login) {
  //   this.id = login.id;
  //   this.username = login.username;
  //   this.password = login.password;
};

Login.validateCredentials = (username, password, cb) => {
  sql.query(
    'SELECT login.id, player.username FROM login, player WHERE player.username = ? AND login.password = ? LIMIT 1',
    [username, password],
    (err, res) => {
      if (err) {
        return cb(err, null);
      }

      if (res.length === 0) {
        return cb(
          {
            type: 'NOT_FOUND',
            message: 'No user found with that username and password',
          },
          null
        );
      }
      return cb(null, res);
    }
  );
};

Login.updatePassword = (password, playerId, result) => {
  sql.query(
    'UPDATE login SET password = ? WHERE id = ?',
    [password, playerId],
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

module.exports = Login;
