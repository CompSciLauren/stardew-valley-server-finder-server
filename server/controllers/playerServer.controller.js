// PlayerServer Controller
//

const PlayerServer = require('../models/playerServer.model.js');

// Create and Save a new PlayerServer
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const PlayerServer = new PlayerServer({
    player_id: req.body.player_id,
    server_id: req.body.server_id,
 });
  console.log(
    '%s,%s',
    PlayerServer.id,
    PlayerServer.server_id
  );

  // Save PlayerServer in the database
  PlayerServer.create(PlayerServer, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the PlayerServer.',
      });
    else res.send(data);
  });
};

// Retrieve all PlayerServers from the database.
exports.findAll = (req, res) => {
  PlayerServer.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving PlayerServers.',
      });
    else res.send(data);
  });
};

// Find a single PlayerServer with a Id
exports.findPlayerServer = (req, res) => {
  console.log('look:', req.params.id);
  PlayerServer.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No PlayerServer found with id ${req.params.player_id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving PlayerServer with id ' + req.params.player_id,
        });
      }
    } else res.send(data);
  });
};

// Delete a PlayerServer with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  PlayerServer.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found PlayerServer with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete PlayerServer with id' + req.params.id,
        });
      }
    } else res.send({ message: `PlayerServer was deleted successfully!` });
  });
};
