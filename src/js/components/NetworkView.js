var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

/** 
 * Material UI Components
 */
var mui = require('material-ui');
var Tabs = mui.Tabs;
var Tab = mui.Tab;

/**
 * Required Components
 */
var ForceGraph = require('./ForceGraph');
var GraphToolbar = require('./GraphToolbar');

var NetworkView = React.createClass({
  render: function(){
    return (
      <Tabs>
        <Tab label="Network" >
          <div id="network-container">
            <ForceGraph 
              id='network-graph' />
            <GraphToolbar
              id='network-toolbar' />
          </div>
        </Tab>
        <Tab label="Analytics" >
          <div id="analytics-container">
            
          </div>
        </Tab>
      </Tabs>
    );
  }
});

module.exports = NetworkView;