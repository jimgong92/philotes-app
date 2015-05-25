var AppDispatcher = require('../dispatcher/AppDispatcher');
var NetworkConstants = require('../constants/NetworkConstants');

var NetworkActions = {
  init: function(svgId){
    AppDispatcher.dispatch({
      actionType: NetworkConstants.INIT,
      svgId: svgId
    });
  },
  add_node: function(nodeObj){
    AppDispatcher.dispatch({
      actionType: NetworkConstants.ADD_NODE,
      node: nodeObj
    });
  },
  edit_node: function(id, nodeObj){
    AppDispatcher.dispatch({
      actionType: NetworkConstants.EDIT_NODE,
      id: id,
      node: nodeObj
    });
  },
  remove_node: function(id){
    AppDispatcher.dispatch({
      actionType: NetworkConstants.REMOVE_NODE,
      id: id
    });
  }
};

module.exports = NetworkActions;