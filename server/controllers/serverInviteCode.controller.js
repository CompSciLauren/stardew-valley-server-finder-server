// ServerInviteCode Controller
//

const ServerInviteCode = require('../models/serverInviteCode.model.js');

// Create and Save a new ServerInviteCode
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const pServerInviteCode = new pServerInviteCode({
    server_id: req.body.server_id,
    invite_code: req.body.invite_code,
  });
  console.log(
    '%s,%s,%s,%s,%s,%s,%s,%s',
    pServerInviteCode.id,

  );

  // Save ServerInviteCode in the database
  ServerInviteCode.create(ServerInviteCode, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the ServerInviteCode.',
      });
    else res.send(data);
  });
};

// Retrieve all ServerInviteCodes from the database.
exports.findAll = (req, res) => {
  ServerInviteCode.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving ServerInviteCodes.',
      });
    else res.send(data);
  });
};

// Find a single ServerInviteCode with a Id
exports.findServerInviteCode = (req, res) => {
  console.log('look:', req.params.id);
  ServerInviteCode.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No ServerInviteCode found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving ServerInviteCode with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a ServerInviteCode with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  ServerInviteCode.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found ServerInviteCode with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete ServerInviteCode with id' + req.params.id,
        });
      }
    } else res.send({ message: `ServerInviteCode was deleted successfully!` });
  });
};
