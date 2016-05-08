module.exports = {
  _currency:{},
  add: function(country, option){
    this._currency[country] = option;
  },
  get: function(country){
    return this._currency[country] || {
      "sign":"$",
      "divider":",",
      "decimal":".",
      "group":3,
      "currency":"#{sign} #{amt}"
    };
  }
}
