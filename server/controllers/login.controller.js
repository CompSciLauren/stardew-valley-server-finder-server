const Login = require('../models/login.model.js');

// Create and Save a new Login
exports.validateCredentials = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  // Save Login in the database
  Login.validateCredentials(username, password, (err, data) => {
    if (err) {
      if (err.type === 'NOT_FOUND') {
        return res.status(400).send({
          message: err.message,
        });
      } else {
        return res.status(500).send({
          message:
            err.message || 'Some error occurred while creating the Login.',
        });
      }
    } else {
      return res.send(data);
    }
  });
};

// Update player's password
exports.updatePassword = (req, res) => {
  Login.updatePassword(req.body.password, req.body.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No User found with ID ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Error retrieving User with ID ' +
            req.params.user_id +
            '. Err Code: ' +
            err,
        });
      }
    } else {
      res.send(data);
    }
  });
};
