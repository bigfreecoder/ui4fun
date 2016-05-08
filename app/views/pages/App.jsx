var React = require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var App = React.createClass({
  mixins: [FluxMixin],

  statics: {
    needs: function (flux) {
      return flux.actions.getCategories();
    }
  },

  componentWillMount: function () {
    return this.getFlux().actions.getCategories();
  },

  componentDidUpdate: function () {
    this.getFlux().actions.getCategories();
  },

  render: function () {
    var children = this.props.children;
     return (
      <div className="app">
      {children}
      </div>
    );
  }
});

module.exports = App;
