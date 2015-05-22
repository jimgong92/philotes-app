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
        if (data.isTaken){
          alert("Username is taken")
        }
        else {  
          _user.username = username;
        }
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
        if (!data.isValid){
          alert("Incorrect username or password")
        }
        else {  
          _user.username = username;
        }
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
        window.location.href = '/';
        _user.username = null;
        _user.networks = [];
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