var Promise = require('bluebird');
var Node = require('../models/Node');
var Network = require('../models/Network');
var Example = require('../models/Example');

module.exports = {
  /**
   * Params: Network ID
   * Returns the Network instance associated with ID
   */
  getFullNetwork: function(req, res){
    var id = req.query.id;
    var getNetwork = function(networkID){
      return new Promise(function(resolve, reject){
        Network.findOne({_id: networkID}, function(err, network){
          if(err) {
            console.error(err);
            reject(err);
          }
          else {
            console.log("Retrieved Network: ", network);
            resolve(network);
          }
        });
      });
    }
    getNetwork(id)
      .then(function(network){
        console.log("Retrieved Network: ", network);
        res.send(JSON.stringify(network));
      })
      .catch(function(err){
        console.log("Error getting ex", ex);
      });
  },
  /**
   * Params: ID, label
   */
  addNode: function(req, res){
    var newNode = {
      _id: req.query.id,
      label: req.query.label,
      friends: []
    };
    var postNode = function(node){
      return new Promise(function(resolve, reject){
        Node.create(node, function(err, node){
          if(err) {
            console.error(err);
            reject(err);
          }
          else {
            console.log("Node Successfully Created: ", node);
            resolve(node);
          }
        });
      });
    }
    postNode(newNode);
  },
  /**
   * Clears MongoDB
   */
  clearDB: function(){
    Node.remove(function(err){
      if (err) console.error("Issue clearing nodes from database");
    });
    Network.remove(function(err){
      if (err) console.error("Issue clearing networks from database");
    });
  },



  getExample: function(req, res){
    var id = req.query.id;
    console.log('in getExample');
    var get = function(exID){
      return new Promise(function(resolve, reject){
        Example.findOne({_id: exID}, function(err, example){
          if (err) reject(err);
          else {
            console.log("ex:", example);
            resolve(example);
          }
        });
      });
    };
    get(id)
      .then(function(ex){
        console.log("Got the example", ex);
        res.send('hi');
      })
      .catch(function(err){
        console.log("Error getting ex", ex);
      });
  }

}

