var Currency = require("./currency.js");

var Methods = {
  "date": function(formatOption, Param){
    var format = formatOption.format,
        time = Object.prototype.toString.call(Param) !== '[object Date]' ? new Date(Param) : Param,
        timeTransform = {
          "y": time.getFullYear().toString().split(""),
          "M": (time.getMonth() + 1).toString().split(""),
          "d": time.getDate().toString().split(""),
          "H": time.getHours().toString().split(""),
          "m": time.getMinutes().toString().split(""),
          "s": time.getSeconds().toString().split(""),
          "f": time.getMilliseconds().toString().split("")
        },
        result = "";

    for(var i=format.length - 1;i>=0 ;i--){
      var character = format[i];
      var pickArray = timeTransform[character];
      if(pickArray != undefined){
        result = (pickArray.length > 0 ? pickArray.pop() : 0) + result;
      }else{
        result = character + result;
      }
    }
    return result;
  },

  "number": function(formatOption, Param){
    var num = Param.toString(),
        integer = "",
        decimal = "",
        option = formatOption.format,
        result = "",
        index = 0;

    if(~num.indexOf('.')){
      var tempSlice = num.split('.');
      integer = tempSlice[0];
      decimal = tempSlice[1];
    }else{
      integer = num;
    }

    if(decimal || (option.scale != undefined && option.scale > 0)){
      if(option.scale == undefined){
        result += option.decimal + decimal;  
      }else{
        if(option.scale > 0){
          if(option.scale < decimal.length){
            var tempDecimail = decimal.substr(option.scale);
            result += option.decimal + (Number("0." + tempDecimail) >= 0.5 ? Number(decimal.substr(0, option.scale)) + 1 : decimal.substr(0, option.scale)).toString();
          }else{
            result += option.decimal + (decimal + "0000000000").substr(0, option.scale)
          }
        }else{
          if(Number("0." + decimal) >= 0.5) integer = (Number(integer) + 1).toString();
        }
      }
    }

    while(index < integer.length){
      result = integer.substr(integer.length - index - 1, 1) + result;
      if(++index % option.group == 0 && index != integer.length){
        result = option.divider + result;
      }
    }

    return result;
  },

  "currency": function(formatOption, Param){
    var currency = Currency.get(this.country);
    var num = Methods.number({"format":currency}, Param);
    return currency.currency.replace("#{sign}", currency.sign).replace("#{amt}", num);
  }
}

module.exports = Methods;
