module.exports = {
  _format:{},
  add: function(lang, formatsArray){
    this._format[lang] = formatsArray;
  },
  get: function(lang){
    return this._format[lang];
  }
}
