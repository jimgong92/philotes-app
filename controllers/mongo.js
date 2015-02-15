var Q = require('q');
var Network = require('../models/Network');
var Example = require('../models/Example');

module.exports = {
  /**
   *
   */
  getFullNetwork = function(networkID, callback){

  }
  /**
   *
   */
  getNode = function(nodeID, callback){

  }
  /**
   * 
   */





  getExample = function(req, res){
    var id = req.body()
    var get = Q.nbind(Example.findOne, Example);
    get({_id: id})
      .then(function(example){
        res.send('hi');
      })
  }

}

