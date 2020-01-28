QUnit.module('Static.Goal', function (mod) {
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
      var num_goals = Game.goals.length;
      var goal = new Static.Goal();
      assert.equal(Game.drawables.length, (num_drawables + 1));
      assert.equal(Game.updatables.length, (num_updatables + 1));
      assert.equal(Game.goals.length, (num_goals + 1));

      assert.equal(typeof goal.x, 'number');
      assert.equal(typeof goal.y, 'number');
      assert.equal(goal.size, 6);
      assert.equal(goal.colour, 'rgba(0, 256, 256, 0.8)')
    }
  );

  QUnit.test(
    'draw',
    function (assert) {
      var goal = new Static.Goal();
      goal.draw();
      // just checking there's no errors
      assert.ok(true);
    }
  );

  QUnit.test(
    'update', function (assert) {
      var goal = new Static.Goal();
      // not caught
      goal.x = 100;
      goal.y = 100;
      goal.update();
      assert.ok(Game.goals.includes(goal));
      assert.ok(Game.drawables.includes(goal));
      assert.ok(Game.updatables.includes(goal));

      // caught
      var score = Player.score.value;
      var speed = Player.head.speed;
      var tail_length = Player.head.tail_segments.length;

      goal.x = Player.head.x;
      goal.y = Player.head.y;
      goal.update();
      assert.notOk(Game.goals.includes(goal));
      assert.notOk(Game.drawables.includes(goal));
      assert.notOk(Game.updatables.includes(goal));

      assert.equal(Player.score.value, (score + 1));
      assert.equal(Player.head.tail_segments.length, (tail_length + 1));
      assert.equal(Player.head.speed, (speed + 0.5));
    }
  )

});