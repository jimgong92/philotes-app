var React = require('react');

/**
 * Material UI components
 */
var mui = require('material-ui');
var Toolbar = mui.Toolbar;
var ToolbarGroup = mui.ToolbarGroup;
var FlatButton = mui.FlatButton;

var Header = React.createClass({
  render: function(){
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <FlatButton 
            primary={true}
            label="Philotes"
            disabled={true}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
});

module.exports = Header;