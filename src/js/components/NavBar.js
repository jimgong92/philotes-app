var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;
/**
 * Material UI components
 */
var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var FlatButton = mui.FlatButton;

var NavBar = React.createClass({
  propTypes: {
    isLoggedIn: ReactPropTypes.bool.isRequired,
    username: ReactPropTypes.string
  },
  _getDestinations: function(){
    var dest = ['How To Use', 'About'];
    var loggedInDest = ['Logout'];

    return
  }
  render: function(){
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <FlatButton
            id="home-button" 
            primary={true}
            label="Philotes"/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          {this._getDestinations()}
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = NavBar;