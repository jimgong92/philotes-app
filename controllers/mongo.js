var Q = require('q');
var Promise = require('bluebird');
var Node = require('../models/Node');
var Network = require('../models/Network');
var Example = require('../models/Example');

module.exports = {
  /**
   *
   */
  getFullNetwork: function(networkID, callback){

  },
  /**
   *
   */
  getNode: function(nodeID, callback){

  },
  /**
   * 
   */





  getExample: function(req, res){
    var id = req.query.id;
    console.log('in getExample');
    // var get = Q.nbind(Example.findOne, Example);
    // get({_id: id})
    //   .then(function(example){
    //     console.log(example);
    //     res.send('hi');
    //   })
    //   .fail(function(err){
    //     console.error(err);
    //   });
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

