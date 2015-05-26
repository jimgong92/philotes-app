var React = require('react');
var ReactPropTypes = React.PropTypes;
/**
 * Material UI Components
 */
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;

var NetworkStore = require('../stores/NetworkStore');
var NetworkActions = require('../actions/NetworkActions');

var GraphToolbar = React.createClass({
  propTypes: {
    id: ReactPropTypes.string
  },
  _onClick: function(){
    NetworkActions.add_node();
  },
  render: function(){
    return (
      <div id={this.props.id}>
        <RaisedButton
          className="add-node-button"
          label="Add Node"
          onClick={this._onClick} />

      </div>
    );
  }
});

module.exports = GraphToolbar;