// Server Controller
//

const Server = require('../models/server.model.js');

// Create and Save a new Server
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  console.log(req.body);
  const server = new server({
    id: req.body.id,
    host_id: req.body.host_id,
    online_hours: req.body.online_hours,
    game_session: req.body.game_session,
    game_year: req.body.game_year,
    farm_layout: req.body.farm_layout,
    theme: req.body.theme,
  });
  console.log(
    '%s,%s,%s,%s,%s,%s,%s,%s',
    server.id,
    server.host_id,
    server.online_hours,
    server.game_session,
    server.game_year,
    server.farm_layout,
    server.theme,
  );

  // Save Player in the database
  Server.create(Server, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Server.',
      });
    else res.send(data);
  });
};

// Retrieve all Servers from the database.
exports.findAll = (req, res) => {
  Server.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Servers.',
      });
    else res.send(data);
  });
};

// Find a single Server with a Id
exports.findServer = (req, res) => {
  console.log('look:', req.params.id);
  Server.findByID(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `No Server found with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving Server with id ' + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Server with the specified id
exports.delete = (req, res) => {
  console.log(req.params.id);
  Server.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Server with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Server with id' + req.params.id,
        });
      }
    } else res.send({ message: `Server was deleted successfully!` });
  });
};
