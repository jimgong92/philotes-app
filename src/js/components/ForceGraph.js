var React = require('react');
var ReactPropTypes = React.PropTypes;
var $ = require('jquery');

// var graphUtils = require('../utils/d3-utils');
var NetworkStore = require('../stores/NetworkStore');
var NetworkActions = require('../actions/NetworkActions');

var ForceGraph = React.createClass({
  propTypes: {
    id: ReactPropTypes.string
  },
  componentDidMount: function(){
    NetworkActions.init(this.props.id);
  },
  render: function(){
    return (
      <svg id={this.props.id}>
      </svg>
    );
  }
});
module.exports = ForceGraph;