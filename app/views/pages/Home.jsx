var React =require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Home = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('CategoryStore')],

  getStateFromFlux: function () {
    return {
    }
  },

  render: function () {
    return (
      <div>
        {this.props.children || (<div>Home Page</div>)}
      </div>
    );
  }
});


module.exports = Home;
