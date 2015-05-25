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
  getInitialState: function(){
    return {
      graph_id: "network-graph"
    };
  },
  render: function(){
    return (
      <Tabs>
        <Tab label="Network" >
          <div id="network-container">
            <ForceGraph id={this.state.graph_id} />
          </div>
        </Tab>
        <Tab label="Analytics" >
          <div id="analytics-container">
            <GraphToolbar />
          </div>
        </Tab>
      </Tabs>
    );
  }
});

module.exports = NetworkView;