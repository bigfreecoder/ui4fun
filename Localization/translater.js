var Dictionary = require("./dictionary.js"),
    Formats = require("./formats.js"),
    Methods = require("./methods.js");

module.exports = function(lang, country){
  var _dict = Dictionary.get(lang);
  var _format = Formats.get(lang);
  var _country = country

  function _handleFormat(words, format, params){
    var startTag = format.tag[0], endTag = format.tag[1],
        reg = new RegExp(".?\\" + startTag + "\\d+\\" + endTag + ".?", "g"),
        matchs =  words.match(reg),
        slice = matchs ? words.split(reg) : [];

    if(matchs == null) return words;

    var values = matchs.map(function(match){
      var startCharacter = "", endCharacter = "";
      if(match.indexOf("{" + startTag) == 0 && match.lastIndexOf(endTag + "}") == match.length - 2){
        return match.substr(1, match.length - 2);
      }
      if(match.indexOf(startTag) != 0 || match.indexOf("{{") == 0){
        startCharacter = match[0];
        match = match.substr(1);
      }
      if(match.lastIndexOf(endTag) != match.length - 1 || match.lastIndexOf("}}") == match.length  - 2){
        endCharacter = match[match.length - 1];
        match = match.substr(0, match.length - 1);
      }
      var index = Number(match.match(/\d+/)[0]);
      var param = params.length > index ? params[index] : "";
      var value = Methods[format.method] ? Methods[format.method].call({"country": _country}, format, param) : param;
      return startCharacter + value + endCharacter;
    });

    var result = ""
    for(var i=0,il=values.length + slice.length; i<il; i++){
      result += i % 2 == 0 ? slice.shift() : values.shift();
    }
    return result;
  }

  return {
    translate: function(){
      if(arguments.length == 0) return;
      var pattern = arguments[0];
      var words = _dict ? _dict[pattern] || pattern : pattern;

      if(arguments.length > 1){
        var params = Array.prototype.slice.call(arguments, 1);
        for(var i=0,il=_format.length; i<il; i++){
          words = _handleFormat(words, _format[i], params)
        }
      }
      return words;
    },

    setLanguage: function(lang){
      _dict = Dictionary.get(lang);
    },

    setCountry: function(country){
      _country = country;
    }
  }
}
