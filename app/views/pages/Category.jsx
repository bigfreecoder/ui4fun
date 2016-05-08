var React =require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Category = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('CategoryStore')],

  getStateFromFlux: function () {
    return {
      products: this.getFlux().store('CategoryStore').getState().products || []
    }
  },

  componentWillMount: function () {
    return this.getFlux().actions.getProductByCategory(this.props.params.categoryId);
  },

  componentDidUpdate: function (prevProps) {
    if (this.props.params.categoryId !== prevProps.params.categoryId){
      this.getFlux().actions.getProductByCategory(this.props.params.categoryId);
    }
  },

  render: function () {
    return (
      <div>
        {this.state.products.map(function (item, index) {
          return (<div key={index}>{item.items[0].details.locale_specific_metadata.default.title}</div>);
        })}
      </div>
    );
  }
});

module.exports = Category;
