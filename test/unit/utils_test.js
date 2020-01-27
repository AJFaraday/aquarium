QUnit.module('Utils', function (mod) {
  QUnit.test(
    'angleDifference',
    function (assert) {
      // simple distance
      assert.equal(Utils.angleDifference(50, 60), 10);
      // Crossing 360 degress (or zero degrees)
      assert.equal(Utils.angleDifference(10, 350), -20);
      assert.equal(Utils.angleDifference(350, 10), 20);
      // angle to right behind
      assert.equal(Utils.angleDifference(0, 180), -180);
      assert.equal(Utils.angleDifference(0, 181), -179);
      assert.equal(Utils.angleDifference(0, 179), 179);
      assert.equal(Utils.angleDifference(90, 270), -180);
      assert.equal(Utils.angleDifference(90, 271), -179);
      assert.equal(Utils.angleDifference(90, 269), 179);
    }
  );

  QUnit.test(
    'outOfRange',
    function (assert) {
      Game.width = 1024;
      Game.height = 768;
      assert.equal(Utils.outOfRange({x: 0, y: 0}), false);
      assert.equal(Utils.outOfRange({x: -20, y: -20}), false);
      assert.equal(Utils.outOfRange({x: 1024, y: 768}), false);
      assert.equal(Utils.outOfRange({x: 1044, y: 788}), false);

      assert.equal(Utils.outOfRange({x: -21, y: -21}), true);
      assert.equal(Utils.outOfRange({x: 1045, y: 100}), true);
      assert.equal(Utils.outOfRange({x: 100, y: 789}), true);
    }
  );

  QUnit.test(
    'angleBetweenPoints',
    function(assert) {
      // right
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 200, y: 100}), 360);
      // left
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 50, y: 100}), 180);
      // up
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 100, y: 50}), 270);
      // down
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 100, y: 200}), 90);
      // south east
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 200, y: 200}), 45);
      // random coords
      assert.equal(Utils.angleBetweenPoints({x: 100, y: 100}, {x: 123, y: 321}), 84.05848020624722);
    }
  );

  QUnit.test(
    'distanceBetweenPoints',
    function(assert) {
      assert.equal(Utils.distanceBetweenPoints({x: 100, y: 100}, {x: 200, y: 100}), 100);
      assert.equal(Utils.distanceBetweenPoints({x: 100, y: 100}, {x: 100, y: 200}), 100);
      assert.equal(Utils.distanceBetweenPoints({x: 100, y: 100}, {x: 200, y: 200}), 141.4213562373095);
    }
  );

  QUnit.test(
    'touching',
    function(assert) {
      var a = {x: 100, y:100, size: 100} ;
      var b = {x: 100, y:100, size: 50} ;
      assert.equal(Utils.touching(a, b), true);
      b.x = 251;
      assert.equal(Utils.touching(a, b), false);
      b.x = 200;
      b.y = 200;
      assert.equal(Utils.touching(a, b), true);
      b.y = 220;
      assert.equal(Utils.touching(a, b), false);
    }
  );


});
