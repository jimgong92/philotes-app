var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

var graphUtils = require('../utils/d3-utils');

var NetworkView = React.createClass({
  getInitialState: function(){
    return {
      graph_id: 'network-graph'
    };
  },
  componentDidMount: function(){
    graphUtils.init(this.state.graph_id);
  },
  render: function(){
    return (
      <div id={this.state.graph_id}>
      </div>
    );
  }
});

module.exports = NetworkView;