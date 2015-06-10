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
  _addNode: function(){
    NetworkActions.add_node();
  },
  _removeNode: function(){
    NetworkActions.remove_node();
  },
  _editNode: function(){
    NetworkActions.edit_node();
  }
  render: function(){
    return (
      <div id={this.props.id}>
        <RaisedButton
          className="add-node-button"
          label="Add Node"
          onClick={this._addNode} />
        <RaisedButton
          className="remove-node-button"
          label="Remove Node"
          onClick={this._removeNode} />
        <RaisedButton 
          className="edit-node-button"
          label="Edit Node"
          onClick={this._editNode} />
      </div>
    );
  }
});

module.exports = GraphToolbar;