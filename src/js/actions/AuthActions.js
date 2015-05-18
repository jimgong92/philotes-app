var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {
  signup: function(username, password){
    AppDispatcher.dispatch({
      actionType: AuthConstants.SIGNUP,
      username: username,
      password: password
    });
  },
  login: function(username, password){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGIN,
      username: username,
      password: password
    });
  },
  logout: function(){
    AppDispatcher.dispatch({
      actionType: AuthConstants.LOGOUT
    });
  }
};

module.exports = AuthActions;