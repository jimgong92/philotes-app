var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var CHANGE_EVENT = 'change';

var _user = {
  username: null,
  networks: []
}

var AuthStore = assign({}, EventEmitter.prototype, {
  signup: function(username, password){
    $.ajax({
      url: window.location.origin + '/auth/signup',
      type: 'POST',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json',
      success: function(data){
        console.log("Successful signup");
        console.log(data);
        var id = data._id;
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in signup");
        console.error(err);
      }
    });
  },
  login: function(username, password){
    $.ajax({
      url: window.location.origin + '/auth/login',
      type: 'POST',
      data: JSON.stringify({
        username: username,
        password: password
      }),
      contentType: 'application/json',
      success: function(data){
        console.log("Successful login");
        console.log(data);
        var id = data._id;
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in login");
        console.error(err);
      }
    });
  },
  logout: function(){
    _user.username = null;
    $.ajax({
      url: window.location.origin + '/auth/logout',
      type: 'POST',
      success: function(data){
        console.log("Successful logout");
        console.log(data);
        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in logout");
        console.error(err);
      }
    });
  },
  getLoginState: function(){
    return Boolean(_user.username);
  },
  getUsername: function(){
    return _user.username;
  },
  getNetworks: function(){
    return _user.networks;
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
    case AuthConstants.SIGNUP:
      AuthStore.signup(action.username, action.password);
      break;
    case AuthConstants.LOGIN:
      AuthStore.login(action.username, action.password);
      break;
    case AuthConstants.LOGOUT:
      AuthStore.logout();
      break;
    default: 
      //no op
  }
});

module.exports = AuthStore;