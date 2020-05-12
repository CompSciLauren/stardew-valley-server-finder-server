// Player Controller
//

const Player = require('../models/player.model.js');

// Create and Save a new Player
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const pplayer = new pplayer({
    id: req.body.id,
    username:  req.body.username,
    timezone: req.body.timezone,
    num_players: req.body.num_players,
    platform: req.body.platform,
    mods: req.body.mods,
    notes: req.body.notes,
    date_modified: req.body.date_modified,
  });
  console.log(
    '%s,%s,%s,%s,%s,%s,%s,%s',
    pplayer.id,
    pplayer.username,
    pplayer.timezone,
    pplayer.num_players,
    pplayer.platform,
    pplayer.mods,
    pplayer.notes,
    pplayer.date_modified
  );

  // Save Player in the database
  Player.create(Player, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Player.',
      });
    else res.send(data);
  });
};

// Retrieve all Players from the database.
exports.findAll = (req, res) => {
  Player.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Players.',
      });
    else res.send(data);
  });
};

// Find a single Player with a Id
exports.findPlayer = (req, res) => {
  console.log('look:', req.params.id);
  Player.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Player found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Player with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Player with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  Player.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Player with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Player with id' + req.params.id,
        });
      }
    } else res.send({ message: `Player was deleted successfully!` });
  });
};
