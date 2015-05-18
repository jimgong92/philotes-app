var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var mui = require('material-ui');
var FlatButton = mui.FlatButton;

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
    BlogStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    BlogStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState(getBlogState());
  },
  render: function(){
    return (
      <div>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = NavBar;