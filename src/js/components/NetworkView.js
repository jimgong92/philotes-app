var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

var ForceGraph = require('./ForceGraph');

var NetworkView = React.createClass({
  getInitialState: function(){
    return {
      graph_id: 'network-graph'
    };
  },
  render: function(){
    return (
      <div id='network-container'>
        <ForceGraph id={this.state.graph_id} />
      </div>
    );
  }
});

module.exports = NetworkView;