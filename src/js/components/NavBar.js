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
var Header = require('./Header');

var AuthStore = require('../stores/AuthStore');
function getUserState(){
  return {
    username: AuthStore.getUsername(),
    networks: AuthStore.getNetworks()
  };
}

var NavBar = React.createClass({
  getInitialState: function(){
    return getUserState()
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
        <Header />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = NavBar;