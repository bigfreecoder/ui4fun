var React = require('react/addons');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);
var expect = chai.expect;
var TestUtils = React.addons.TestUtils;
var should = chai.should();

var TestComponent = require('../app/views/components/Button.jsx');

describe('test component function', function() {

  it('it should fire click event', function() {

    var clickHandleFunction = chai.spy(function(){});
    // var clickHandleFunction = function(){console.log('abc')};

    var button = TestUtils.renderIntoDocument(
                  <TestComponent clickHandle={clickHandleFunction}>
                    TestButton
                  </TestComponent>
                );

    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(button, "div"));

    clickHandleFunction.should.have.been.called();
  })
})
