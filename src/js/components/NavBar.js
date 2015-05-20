var React = require('react');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;

var AuthStore = require('../stores/AuthStore');
var AuthActions = require('../actions/AuthActions');

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
  _getUserOption: function(){
    if (this.props.isLoggedIn){
      return (
        <Link to="login">
          <FlatButton
            secondary={true}
            label="Login" />
        </Link>
      );
    }
    return (
      <FlatButton
        secondary={true}
        label="Logout" 
        onClick={AuthActions.logout}/>
    );
  },
  render: function(){
    // var userOption = (this.props.isLoggedIn ? 
    //   <Link to="login">
    //       <FlatButton
    //         secondary={true}
    //         label="Login" />
    //     </Link>
    //   : <FlatButton
    //     secondary={true}
    //     label="Logout" 
    //     onClick={AuthActions.logout}/>
    // );
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <Link to="home">
            <FlatButton
              id="home-button" 
              primary={true}
              label="Philotes"/>
          </Link>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="right">
          <Link to="howto">
            <FlatButton
              secondary={true}
              label="How To Use" />
          </Link>
          <Link to="about">
            <FlatButton
              secondary={true}
              label="About" />
          </Link>
          {this._getUserOption()}
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = NavBar;