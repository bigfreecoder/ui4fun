var Dictionary = require("./dictionary.js"),
    Formats = require("./formats.js"),
    Translater = require("./translater.js"),
    Currency = require("./currency.js");

module.exports = {
  defaultOptions:{
    lang: "en"
  },
  init: function(translateData, currencyData){
    this.addLanguage(translateData);
    this.addCurrency(currencyData);
  },
  addLanguage: function(translateData){
    for(var lang in translateData){
      var langDict = translateData[lang];
      for(var pattern in langDict.translate){
        Dictionary.add(lang, pattern, langDict.translate[pattern]);
      }
      Formats.add(lang, langDict.format);
    }
  },
  addCurrency: function(currencyData){
    for(var country in currencyData){
      Currency.add(country, currencyData[country]);
    }
  },
  getTranslater: function(lang, country){
    if(!lang) lang = defaultOptions.lang;
    return new Translater(lang, country);
  }
}
