var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Link = Router.Link;
var DefaultRoute = Router.DefaultRoute;

/**
 * Needed for onTouchTap events in Material-UI
 */
require("react-tap-event-plugin")();

/**
 * Required Components
 */ 
var App = require('./components/AppComponent');

var routes = (
  <Route name="home" path="/" handler={App}/>
    // <Route name="howto" path="howto" handler={HowToView}
    // <Route name="about" path="about" handler={AboutView}
    // <Route name="login" path="login" handler={LoginView}
    // <Route name="signup" path="signup" handler={SignupView}
    // <DefaultRoute name="network" path="network" handler={NetworkView}
  // </Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
});