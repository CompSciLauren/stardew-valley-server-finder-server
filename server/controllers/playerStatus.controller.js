// PlayerStatusStatus Controller

const PlayerStatus = require('../models/playerStatus.model.js');

// Create and Save a new PlayerStatus
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const pPlayerStatus = new pPlayerStatus({
    player_id: req.body.player_id,
    status_id: req.body.status_id
  });
  console.log(
    '%s,%s,%s,%s,%s,%s,%s,%s',
    pPlayerStatus.player_id,
    pPlayerStatus.status_id
  );

  // Save PlayerStatus in the database
  PlayerStatus.create(PlayerStatus, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the PlayerStatus.',
      });
    else res.send(data);
  });
};

// Retrieve all PlayerStatus from the database.
exports.findAll = (req, res) => {
  PlayerStatus.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving PlayerStatuss.',
      });
    else res.send(data);
  });
};

// Find a single PlayerStatus with a Id
exports.findPlayerStatus = (req, res) => {
  console.log('look:', req.params.id);
  PlayerStatus.findByID(req.params.id1, req.params.id2, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No PlayerStatus found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving PlayerStatus with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a PlayerStatus with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  PlayerStatus.remove(req.params.id1, req.params.id2, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found PlayerStatus with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete PlayerStatus with id' + req.params.id,
        });
      }
    } else res.send({ message: `PlayerStatus was deleted successfully!` });
  });
};
