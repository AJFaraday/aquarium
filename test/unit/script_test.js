QUnit.module('Script', function (mod) {
  mod.beforeEach(function () {
    Game.init();
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);
    Game.draw();
    Game.update();
  });

  Script.Actions.n = 0;
  Script.Actions.test_action = function(attrs) {
    Script.Actions.n += attrs['amount']
  };

  QUnit.test(
    'for score',
    function (assert) {
      var actions = Script.Actions.for_score(0);
      assert.equal(typeof actions, 'object'); // but it's an array really
      assert.equal(typeof actions[0], 'object'); // but it's a hash really
    }
  );

  QUnit.test(
    'run without type',
    function (assert) {
      Script.Steps[0].push({func: 'test_action', amount: 2});
      Script.Actions.run_without_type(0);
      assert.equal(Script.Actions.n, 2);

      // tidy up
      Script.Steps[0].pop();
      Script.Actions.n = 0;

      // Don't run it because it has a type
      Script.Steps[0].push({func: 'test_action', amount: 3, type: 'oneshot'});
      Script.Actions.run_without_type(0);
      assert.equal(Script.Actions.n, 0);

      // tidy up
      Script.Steps[0].pop();
    }
  );

  QUnit.test(
    'run with type',
    function (assert) {
      Script.Steps[0].push({func: 'test_action', amount: 2, type: 'oneshot'});
      Script.Actions.run_with_type(0, 'oneshot');
      assert.equal(Script.Actions.n, 2);

      // tidy up
      Script.Steps[0].pop();
      Script.Actions.n = 0;

      // Don't run it because it has no type
      Script.Steps[0].push({func: 'test_action', amount: 3});
      Script.Actions.run_with_type(0, 'oneshot');
      assert.equal(Script.Actions.n, 0);

      // tidy up
      Script.Steps[0].pop();
    }
  );

  QUnit.test(
    'show help',
    function (assert) {
      Script.Actions.run_action({func: 'show_help', message: 'this is a test!', index: 3});
      // just checking for errors
      assert.ok(true);
    }
  );

  QUnit.test(
    'add enemy',
    function (assert) {
      Script.Actions.run_action({func: 'add_enemy', enemy_type: 'Missile', x: 20, y: 10});
      var enemy = Game.drawables[Game.drawables.length - 1];
      assert.equal(enemy.constructor.name, 'Missile');
      assert.equal(enemy.x, 20);
      assert.equal(enemy.y, 10);

      Script.Actions.run_action({func: 'add_enemy', enemy_type: 'Chaser', x: 12, y: 20});
      var enemy = Game.drawables[Game.drawables.length - 1];
      assert.equal(enemy.constructor.name, 'Chaser');
      assert.equal(enemy.x, 12);
      assert.equal(enemy.y, 20);

    }
  );

});