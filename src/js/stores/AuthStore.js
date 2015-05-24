var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('jquery');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var CHANGE_EVENT = 'change';

var _user = {
  sid: window.localStorage.getItem('sid.philotes') || null,
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
          window.localStorage.setItem('sid.philotes', data.sid);
          window.location.replace('/');
          initUserInfo();
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
          window.localStorage.setItem('sid.philotes', data.sid);
          window.location.replace('/');
          initUserInfo();
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
    $.ajax({
      url: window.location.origin + '/auth/logout',
      type: 'POST',
      data: JSON.stringify({
        sid: _user.sid
      }),
      contentType: 'application/json',
      success: function(data){
        window.localStorage.removeItem('sid.philotes');
        window.location.href = '/';
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
    return Boolean(_user.sid);
  },
  initUserInfo: function(){
    var sid = window.localStorage.getItem('sid.philotes');
    if (!sid) {
      console.log('No current session');
      return;
    }
    $.ajax({
      url: window.location.origin + '/user/info?sid=' + sid,
      type: 'GET',
      success: function(data){
        _user.username = data.username;
        //TODO: RETRIEVE USER NETWORKS

        this.emitChange();
      }.bind(this),
      error: function(err){
        console.error("Error in initUserInfo");
        console.error(err);
      }
    });
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

AuthStore.initUserInfo();

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