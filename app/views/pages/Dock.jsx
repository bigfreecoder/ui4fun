var React =require('react');
var Link = require('react-router').Link;
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Dock = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('CategoryStore')],

  getStateFromFlux: function () {
    var store = this.getFlux().store('CategoryStore');
    return {
      categories: store.categories || []
    };
  },

  render: function () {
    return (
      <div>
        <ul>
          {this.state.categories.map(function (item, index) {
            return (<li key={index}><Link to={"/category/" + item.id}>{item.name}</Link></li>)
          })}
        </ul>
      </div>
    );
  }
});

module.exports = Dock;
