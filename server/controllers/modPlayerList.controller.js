// Mods Controller
//

const PlayerList = require('../models/modPlayerList.model.js');

exports.getPlayerwithModList = (req, res) => {
    console.log(req.params.id);
    PlayerList.getPlayerList(req.params.id, (err, data) => {
      if(err) {
        if(err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found player with mod id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error finding player list with mod id '+req.params.id,
          });
        }
      }else res.send(data);
    });
  };