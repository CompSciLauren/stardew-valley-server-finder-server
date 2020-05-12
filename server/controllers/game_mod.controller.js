// Mods Controller
//

const Game_Mod = require('../models/game_mod.model.js');

// Create and Save a new mod
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const game_mod = new game_mod({
    id: req.body.id,
    name:  req.body.name,
    desc: req.body.desc,
    creator: req.body.creator,
    contact: req.body.contact,
    lastupdate: req.body.lastupdate,
  });
  console.log(
    '%s,%s,%s,%s,%s,%s,%s,%s',
    game_mod.id,
    game_mod.name,
    game_mod.desc,
    game_mod.creator,
    game_mod.contact,
    game_mod.lastupdate,
  );

  // Save Mod in the database
  Game_Mod.create(Game_Mod, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Mod.',
      });
    else res.send(data);
  });
};

// Retrieve all Mods from the database.
exports.findAll = (req, res) => {
  Game_Mod.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Mods.',
      });
    else res.send(data);
  });
};

// Find a single Mod with a Id
exports.findMod = (req, res) => {
  console.log('look:', req.params.id);
  Game_Mod.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Mod found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Mod with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Mod with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  Game_Mod.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Mod with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Mod with id' + req.params.id,
        });
      }
    } else res.send({ message: `Mod was deleted successfully!` });
  });
};
