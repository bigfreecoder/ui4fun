module.exports = {
  _dict:{},
  add: function(lang, pattern, words){
    if(!this._dict[lang]) this._dict[lang] = {};
    this._dict[lang][pattern] = words;
  },
  get: function(lang){
    return this._dict[lang];
  }
}
