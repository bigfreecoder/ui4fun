var React =require('react');
var Fluxxor = require("fluxxor");
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Login = React.createClass({

  mixins: [FluxMixin, StoreWatchMixin('ConfigStore')],

  getStateFromFlux: function () {
    var config = this.getFlux().store("ConfigStore").config;
    var deviceString = "&device_type=B&device_platform=Linux&device_model=Chrome&device_os_version=23";
    return {
      url:
        "https://tokengateway"+
        config.lcn_domain+
        "/tokengateway/v1/"+config.client_provider+
        "/authorize?response_type=code&"+
        "client_id="+config.client_id+
        "&redirect_uri="+config.client_token_redirect+
        "&X-HP-Client-Id="+config.client_id+
        deviceString
    };
  },

  componentDidMount:function() {
    this.handleMessageHandler(true);
  },

  componentWillUnmount:function() {
    this.handleMessageHandler(false);
  },

  handleMessageHandler:function(state) {
    var func  = this.processMessage;
    if(state){
      if (window.addEventListener) { // W3C DOM
        window.addEventListener("message", func, false);
      } else if (window.attachEvent) { // IE DOM
        window.attachEvent("onmessage", func);
      } else {
        window["message"] = func;
      }  
    }else{
      if (window.removeEventListener) {  // W3C DOM
        window.removeEventListener("message", func, false);
      } else if (window.detachEvent) { // IE DOM
        window.detachEvent("onmessage", func);
      } else {
        window["message"] = undefined;
      }
    }
  },

  processMessage:function(event) {
    if(event && event.data) {
      var payload = null;
      try {
        payload = JSON.parse(event.data);
      } catch(e) {
        return;
      }
      console.log(payload);
      switch(true) {
        case (payload.func == "webId"):

          //this.getFlux().actions.performLogin(payload.code);
          break;
        case (payload.func == "SAML"):
          // TODO
          break;
      }
    }
  },

  render: function () {
    return (
      <iframe className="login-iframe" src={this.state.url}></iframe>
    );
  }
});


module.exports = Login;
