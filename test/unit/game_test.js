QUnit.module('Game', function (mod) {
  mod.beforeEach(function () {
    Game.init();
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);
    one_turn();
  });

  function one_turn() {
    Game.draw();
    Game.update();
  }

  QUnit.test(
    'init',
    function (assert) {
      assert.equal(1024, Game.width);
      assert.equal(768, Game.height);
      // Player.init
      assert.ok(Player.head);
      assert.ok(Player.score);
      assert.ok(Player.health);
      assert.ok(Player.target);
      // back to Game.init
      assert.equal(Game.drawables.constructor.name, 'Array');
      assert.equal(Game.updatables.constructor.name, 'Array');
      assert.equal(Game.goals.constructor.name, 'Array');
      assert.equal(Game.goals.length, 1);
      assert.equal(typeof Game.draw_loop, 'number');
      assert.equal(typeof Game.update_loop, 'number');
    }
  );

  QUnit.test(
    'updatables gonna update',
    function (assert) {
      var updatable = {
        n: 0,
        update: function () {
          this.n++
        }
      };
      Game.updatables.push(updatable);
      Game.update();
      assert.equal(updatable.n, 1);
      Game.update();
      assert.equal(updatable.n, 2);
      Game.updatables.pop();
    }
  );

  QUnit.test(
    'drawables gonna draw',
    function (assert) {
      var drawable = {
        n: 0,
        draw: function () {
          this.n++
        }
      };
      Game.drawables.push(drawable);
      Game.draw();
      assert.equal(drawable.n, 1);
      Game.draw();
      assert.equal(drawable.n, 2);
      Game.drawables.pop();
    }
  );

  QUnit.test(
    'drawing does persistent script actions',
    function (assert) {
      // includes help text
      assert.equal(Game.updatables.length, 2);
      assert.equal(Game.drawables.length, 4);
      Player.score.value = 1;
      one_turn();
      assert.equal(Game.updatables.length, 2);
      assert.equal(Game.drawables.length, 4);
    }
  );

  QUnit.test(
    'Mouse pointer goes to player target',
    function (assert) {
      Game.follow_mouse(
        {
          preventDefault: function () {
          },
          clientX: 10,
          clientY: 20
        }
      );
      var rect = Game.canvas.canvas.getBoundingClientRect();
      assert.equal(Player.head.target.x, (10 - rect.left));
      assert.equal(Player.head.target.y, (20 - rect.top));
    }
  );

  QUnit.test(
    'Mobile taps go to player target',
    function (assert) {
      Game.follow_touch(
        {
          preventDefault: function () {
          },
          targetTouches: [
            {
              pageX: 50,
              pageY: 70
            }
          ]
        }
      );
      var rect = Game.canvas.canvas.getBoundingClientRect();
      assert.equal(Player.head.target.x, (50 - rect.left));
      assert.equal(Player.head.target.y, (70 - rect.top));
    }
  );

  QUnit.test(
    'add one goal up to level 10',
    function (assert) {
      Player.score.value = 0;
      Game.goals = [];
      Game.add_goals();
      assert.equal(Game.goals.length, 1);
    }
  );

  QUnit.test(
    'add two goal up to level 20',
    function (assert) {
      Player.score.value = 10;
      Game.goals = [];
      Game.add_goals();
      assert.equal(Game.goals.length, 2);
    }
  );

  QUnit.test(
    'add two goal up to level 30',
    function (assert) {
      Player.score.value = 20;
      Game.goals = [];
      Game.add_goals();
      assert.equal(Game.goals.length, 3);
    }
  );

  QUnit.test(
    'add no obstacles up to level 10',
    function (assert) {
      Player.score.value = 9;
      Game.goals = [new Static.Goal()];
      var n_updatables = Game.updatables.length;
      var n_drawables = Game.drawables.length;
      Game.add_obstacles();
      assert.equal(Game.updatables.length, n_updatables);
      assert.equal(Game.drawables.length, n_drawables);
    }
  );

  QUnit.test(
    'add one obstacle up to level 20',
    function (assert) {
      Player.score.value = 10;
      Game.goals = [new Static.Goal()];
      var n_updatables = Game.updatables.length;
      var n_drawables = Game.drawables.length;
      Game.add_obstacles();
      assert.equal(Game.updatables.length, (n_updatables + 1));
      assert.equal(Game.drawables.length, (n_drawables + 1));
    }
  );

  QUnit.test(
    'end the game',
    function (assert) {
      Game.end();
      // we need an assertion, but all I'm checking is that this throws no errors
      assert.ok(true);
    }
  );

});
