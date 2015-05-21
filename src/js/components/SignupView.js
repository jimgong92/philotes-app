var React = require('react');
var $ = require('jquery');

var AuthActions = require('../actions/AuthActions');
var AuthStore = require('../stores/AuthStore');

/**
 * Material UI Components
 */
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

/**
 * Component Dependencies
 */
var TextInput = require('./TextInput');

var SignupView = React.createClass({
  _onSave: function(){
    var username = $('#signup-username-field').val().trim();
    var password = $('#signup-password-field').val().trim();
    var confirm_password = $('#signup-confirm-password-field').val().trim();
    if (username && password && confirm_password) {
      if (password === confirm_password){
        AuthActions.signup(username, password);
      }
      else {
        //HANDLE NON-MATCHING PASSWORDS
        alert('Passwords must match');
      }
    }
  },
  render: function(){
    return (
      <div id="signup">
        <h2>Signup</h2>
        <TextInput
          label="Username"
          id="signup-username-field"
          type="text" 
          onSave={this._onSave} />
        <br />
        <TextInput
          label="Password"
          id="signup-password-field"
          type="password" 
          onSave={this._onSave} />
        <br />
        <TextInput
          label="Confirm Password"
          id="signup-confirm-password-field"
          type="password" 
          onSave={this._onSave} />
        <br />
        <RaisedButton
          primary={true} 
          label="Signup"
          id="signup-submit"
          onClick={this._onSave} />
      </div>
    );
  }
});

module.exports = SignupView;