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
