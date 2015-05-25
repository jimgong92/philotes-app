var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

var graphUtils = require('../utils/d3-utils');

var ForceGraph = React.createClass({
  propTypes: {
    id: ReactPropTypes.string
  },
  componentDidMount: function(){
    graphUtils.init(this.props.id);
  },
  render: function(){
    return (
      <svg id={this.props.id}>
      </svg>
    );
  }
});

module.exports = ForceGraph;