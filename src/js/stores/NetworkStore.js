var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var NetworkConstants = require('../constants/NetworkConstants');

var CHANGE_EVENT = 'change';

var _networks = {};

var NetworkStore = assign({}, EventEmitter.prototype, {
  add_node: function(node){
    $.ajax({
      url: window.location.origin + '/node/add',
      type: 'POST',
      data: JSON.stringify({
        node: node
      }),
      contentType: 'application/json',
      success: function(data){
        console.log("Successfully added node");
        console.log(data);
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in add_node");
        console.error(err);
      }
    });
  },
  edit_node: function(id, node){
    $.ajax({
      url: window.location.origin + '/node/edit',
      type: 'POST',
      data: JSON.stringify({
        id: id,
        node: node
      }),
      contentType: 'application/json',
      success: function(data){
        console.log("Successful edited node");
        console.log(data);
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in edit_node");
        console.error(err);
      }
    });
  },
  remove_node: function(){
    _user.username = null;
    $.ajax({
      url: window.location.origin + '/node/remove',
      type: 'POST',
      success: function(data){
        console.log("Successfully removed node");
        console.log(data);
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in remove_node");
        console.error(err);
      }
    });
  },
  emitChange: function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action){
  console.log(action);
  switch(action.actionType){
    case NetworkConstants.ADD_NODE:
      NetworkStore.add_node(action.node);
      break;
    case NetworkConstants.EDIT_NODE:
      NetworkStore.edit_node(action.id, action.node);
      break;
    case NetworkConstants.REMOVE_NODE:
      NetworkStore.remove_node(action.id);
      break;
    default: 
      //no op
  }
});

module.exports = NetworkStore;