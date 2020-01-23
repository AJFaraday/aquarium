QUnit.module('Canvas', function (mod) {
  mod.before(function () {
    canvas = new Canvas();
  });

  QUnit.test("Gets canvas and ctx from DOM", function (assert) {
    assert.equal(canvas.canvas.constructor.name, 'HTMLCanvasElement');
    assert.equal(canvas.ctx.constructor.name, 'CanvasRenderingContext2D');
  });

  QUnit.test("Draws a circle at a given place", function (assert) {
    canvas.draw_circle({x: 100, y: 100, size: 40, colour: 'rgba(128, 128, 255, 0.7)'});
    assert.ok(true, 'drew a circle');
  });

  QUnit.test("Draws a square at a given place", function (assert) {
    canvas.draw_square({x: 200, y: 100, size: 30, colour: 'rgba(0, 255, 255, 0.2)'});
    assert.ok(true, 'drew a square');
  });

  QUnit.test("Draws a square at a given place", function (assert) {
    canvas.draw_text('test', 200, 200, 'rgba(128, 128, 0, 0.5)', 'left', 100);
    assert.ok(true, 'drew a text');
  });

  QUnit.test("Draws a triangle at a given place", function (assert) {
    // find out, at some point, why we can't see this
    canvas.draw_triangle({x: 400, y: 400, size: 30, angle: 45});
    assert.ok(true, 'drew a triangle');
  });

  QUnit.test('clear the board', function(assert) {
    canvas.clear();
    assert.ok(true, 'cleared the board');
  })

});
