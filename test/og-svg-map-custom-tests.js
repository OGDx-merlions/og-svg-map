// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for og-svg-map', function() {
    test('Check initial value of counter', function(done){
      var counterEl = Polymer.dom(document).querySelector('og-svg-map'),
          counterValueEl = Polymer.dom(counterEl.root).querySelector('span');
      assert.equal(counterValueEl.textContent, '0');
      done();
    });

    test('Clicking og-svg-map increments the counter', function(done){
      var counterEl = Polymer.dom(document).querySelector('og-svg-map'),
          counterValueEl = Polymer.dom(counterEl.root).querySelector('span');
      assert.equal(counterValueEl.textContent, '0');

      counterEl.click();
      flush(function(){
        assert.equal(counterValueEl.textContent, '1');
      });
      done();
    });
  });
}
