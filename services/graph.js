/**
 * Params: Target node, network
 * Gets all links of a target node in order
 */
function getOrderedLinks(targetNode, network){
  //Tuple contains a matrix of connected nodes and an array of unconnected nodes
  var connected = [],
      unconnected = [];

  return [connected, unconnected];
}

/**
 * Params: Origin node, the network, specified length from node
 */
function getLinksAtGeodesic(targetNode, network, geodesic){
  
}

/**
 * Params: Target node, callback
 * Performs a callback on the local graph once only
 */
function breadthFirstLog(targetNode, callback){
  var hasBeenVisited = {};
  var queue = [];
  function subRoutine(node){
    if (!hasBeenVisited[node._id]){
      callback(node);
      hasBeenVisited[node._id] = true;
      var links = node.friends;
      for (var i = 0; i < links.length; i++){
        if (!hasBeenVisited[friends[i]._id]){
          queue.push(friends[i]);
        }
      }
    }
  }
}