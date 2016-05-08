#Localization Function
## 1. How to use:
```js
var Localization = require('../lib/localization/index.js');
Localization.init(translateData, currencyData);
var translater = Localization.getTranslater("zh_CN", "US");
translater.translate("this is a test string");
```
line 1: require this module.  
line 2: init localization datas.  
line 3: getTranslater, first parameter for language.  
        this function will use it as languageKey to fetch translate from translateData which is you passed to init function.
        second parameter for country, this function will use it as countryKey to fetch currency from currencyData which is you passed to init function.  
line 4: use translater to translate your strings;

### additional function:
```js
Localization.addLanguage(translateData);  // add additional language dynamically
Localization.addCurrency(currencyData);   // add additional currency dynamically
```  
**you can check the demo in test/localization.js**

## 2. Data format:
every words in [] can be replace as your want or some options.

### a. translate data format:
```js
  {
    [languageKey]:{
      "translate":{
        [translateKey]:[translateString]
      }
      "format": [
        {"tag":[mark], "method":[replace], "format":[methodFormat]},
      ]
  }
```

**every language has two part in json:**    
1.  the translate part is used for text translate template.   
2. the format part is used for replace variables in translate template;

**in format part:**     
1. tag is the variable identify symbol, it should be only 2 character string.(eg. [] or () or {}). Localization module will find all numbers wrapped with tag and replace them with your parameter according you passed in.     
2. method means we can use some function to handle replace process. this arguments can be one of "replace","date","number" and "currency".and you can extend methods in "lib/localization/methods".   
3. format is parameter of the method;

### b. currency data format:
```js
  {
    "countryKey":{
      "sign":[sign],
      "divider":[divider],
      "group":[group],
      "decimal":[decimal],
      "scale":[scale]
      "currency":[currency format],
    },
  }
```

- __sign__ is for the symbol for the currency.    
- __divider__ is split symbol in the integer numbers. 
- __group__ means how many numbers will be a group, a divider will added between every group.  
- __decimal__ is split symbol to split integer and decimal.   
- __scale__ is scale for decimal, decimal will fill with 0 or will be rouned to match scale.  
- __currency__ is a string like "#{sign} #{amt}", we will replace "#{sign}" with sign, and replace "#{amt}" with formated number;
    
**you can check the demo in test/data/localization.json;**



