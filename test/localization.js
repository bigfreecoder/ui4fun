var chai = require('chai');
var expect = chai.expect;
var data = require("./data/localization.json");
var Localization = require('../lib/localization/index.js');
var translateData = data.translate;
var currencyData = data.currency;

Localization.init(translateData, currencyData);

describe('Verify Localization function', function() {

  var translater = Localization.getTranslater("zh_CN", "US");

  it('text translate', function() {
    expect(translater.translate("this is a test string"))
      .to.be.a('string')
      .to.equal("这是个测试字符串");

    expect(translater.translate("param test for {0}", "test"))
      .to.be.a('string')
      .to.equal('参数测试: test');

    expect(translater.translate("{0} param test {1}, should be {0}", 2, "字符串"))
      .to.be.a('string')
      .to.equal("2个参数的测试字符串,应该是2");

    expect(translater.translate("it's different {{0}} and {0}", "test" ))
      .to.be.a('string')
      .to.equal("区分{0}和test的翻译");

    expect(translater.translate("{0} day, {1} month, {2} year", 1, 3, 2000))
      .to.be.a('string')
      .to.equal("2000年3月1日");

    expect(translater.translate("none translater test"))
      .to.be.a('string')
      .to.equal('none translater test');
  })

  it('time translate', function() {
    var today = new Date(),
        year = today.getFullYear(),
        month = "00" + (today.getMonth() + 1), month = month.substr(month.length - 2, 2),
        day = "00" + today.getDate(), day = day.substr(day.length - 2, 2),
        hours = "00" + today.getHours(), hours = hours.substr(hours.length - 2, 2),
        minutes = "00" + today.getMinutes(), minutes = minutes.substr(minutes.length - 2, 2),
        seconds = "00" + today.getSeconds(), seconds = seconds.substr(seconds.length - 2, 2)

    expect(translater.translate("today is: #0#", today))
     .to.be.a('string')
     .to.equal("今天是: " + year + "年"+ month + "月" + day + "日");

    expect(translater.translate("short-time", today))
      .to.be.a('string')
      .to.equal(month + "月" + day + "日, " + year + "年");

    expect(translater.translate("detail-time", today))
      .to.be.a('string')
      .to.equal(hours + ":" + minutes + ":" + seconds + " " + month + "月" + day + "日, " + year + "年");
  });

  it('number translate', function() {

    var testNumber = 7758293.721;

    expect(translater.translate("number-format1", testNumber))
      .to.be.a('string')
      .to.equal("7,758,294")

    expect(translater.translate("number-format2", testNumber))
      .to.be.a('string')
      .to.equal("775 8293.72")

    expect(translater.translate("number-format3", testNumber))
      .to.be.a('string')
      .to.equal("775 8293.72100")

    expect(translater.translate("number-format4", testNumber))
      .to.be.a('string')
      .to.equal("775 8293.72 and 7,758,294 and 775 8293.72100 are same Number")
  })

  it('currency translate', function() {

    var testAmount = 7758293.721;

    expect(translater.translate("currency-format", testAmount))
      .to.be.a('string')
      .to.equal("$ 7,758,293.721")
  })  
})
