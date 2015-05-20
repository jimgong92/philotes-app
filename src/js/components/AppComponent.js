var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

/** 
 * Material UI Components
 */
var mui = require('material-ui');
var FlatButton = mui.FlatButton;

/** 
 * Component Dependencies
 */
var NavBar = require('./NavBar');

var AuthStore = require('../stores/AuthStore');
function getUserState(){
  return {
    isLoggedIn: AuthStore.getLoginState(),
    username: AuthStore.getUsername(),
    networks: AuthStore.getNetworks()
  };
}

var AppComponent = React.createClass({
  getInitialState: function(){
    return getUserState();
  },
  componentDidMount: function(){
    AuthStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    AuthStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getBlogState());
  },
  render: function(){
    return (
      <div>
        <NavBar isLoggedIn={this.state.isLoggedIn}/>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = AppComponent;