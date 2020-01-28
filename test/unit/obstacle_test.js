QUnit.module('Static.Obstacle', function (mod) {
  mod.beforeEach(function () {
    Game.init();
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);
    Game.draw();
    Game.update();
  });

  QUnit.test(
    'constructor',
    function (assert) {
      var num_drawables = Game.drawables.length;
      var num_updatables = Game.updatables.length;
      var obstacle = new Static.Obstacle();
      assert.equal(Game.drawables.length, (num_drawables + 1));
      assert.equal(Game.updatables.length, (num_updatables + 1));

      assert.equal(typeof obstacle.x, 'number');
      assert.equal(typeof obstacle.y, 'number');
      assert.equal(obstacle.size, 6);
      assert.equal(obstacle.colour, 'rgba(256, 0, 0, 0.8)')
    }
  );

  QUnit.test(
    'draw',
    function (assert) {
      var obstacle = new Static.Obstacle();
      obstacle.draw();
      // just checking there's no errors
      assert.ok(true);
    }
  );

  QUnit.test(
    'update', function (assert) {
      var obstacle = new Static.Obstacle();
      // not caught
      obstacle.x = 100;
      obstacle.y = 100;
      obstacle.update();
      assert.ok(Game.drawables.includes(obstacle));
      assert.ok(Game.updatables.includes(obstacle));

      // caught
      Player.head.grow_tail();
      var health = Player.health.value;
      var speed = Player.head.speed;

      obstacle.x = Player.head.x;
      obstacle.y = Player.head.y;
      obstacle.update();
      assert.notOk(Game.drawables.includes(obstacle));
      assert.notOk(Game.updatables.includes(obstacle));

      assert.equal(Player.health.value, (health - 1));
      assert.equal(Player.head.speed, (speed + 0.5));
    }
  )

});