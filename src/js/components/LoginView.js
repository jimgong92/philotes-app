var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');
var Router = require('react-router');
var Link = Router.Link;

var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');

/**
 * Material UI Components
 */
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var FlatButton = mui.FlatButton;

/**
 * Component Dependencies
 */
var TextInput = require('./TextInput');

var LoginView = React.createClass({
  _onSave: function(){
    var username = $('#login-username-field').val().trim();
    var password = $('#login-password-field').val().trim();
    if (username && password) {
      AuthActions.login(username, password);
    }
  },
  render: function(){
    return (
      <div id="login">
        <h2>Login</h2>
        <TextInput
          label="Username"
          id="login-username-field"
          type="text" 
          onSave={this._onSave} />
        <br />
        <TextInput
          label="Password"
          id="login-password-field"
          type="password" 
          onSave={this._onSave} />
        <br />
        <RaisedButton
          primary={true} 
          label="Login"
          id="login-submit"
          onClick={this._onSave} />
        <Link to="signup">
        <FlatButton 
          primary={true}
          label="Create an account"
          id="direct-to-signup" />
        </Link>
      </div>
    );
  }
});

module.exports = LoginView;