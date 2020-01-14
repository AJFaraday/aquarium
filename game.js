Game = {
  init: function () {
    Canvas.init();

    window.onmousemove = Game.follow_event;
    window.ontouchend = Game.follow_event;
    window.ontouchmove = Game.follow_event;

    Game.head = new Head(new MoveTarget());

    Game.score = new Score();
    Game.health = new Health();

    Game.drawables = [Game.head, Game.score, Game.health];
    Game.updatables = [Game.head];

    Game.goals = [];
    Game.add_goals();

    Game.draw_loop = setInterval(
      function () {
        requestAnimationFrame(Game.draw)
      },
      10
    );
    Game.update_loop = setInterval(Game.update, 10);
  },

  update: function () {
    Game.updatables.forEach(
      function (updatable) {
        updatable.update();
      }
    );
  },

  draw: function () {
    Canvas.ctx.clearRect(0, 0, 1024, 768);
    Game.drawables.forEach(
      function (drawable) {
        drawable.draw();
      }
    );
    Game.do_script_actions()
  },

  follow_event: function (e) {
    e.preventDefault();
    var rect = Canvas.canvas.getBoundingClientRect();
    Game.head.target.x = e.clientX - rect.left;
    Game.head.target.y = e.clientY - rect.top;
  },

  add_goals: function () {
    if (Game.goals.length == 0) {
      var no_to_add = Math.floor(Game.score.value / 10) + 1;
      for (var x = no_to_add; x > 0; x--) {
        var new_goal = new Static.Goal();
        Game.drawables.push(new_goal);
        Game.updatables.push(new_goal);
        Game.goals.push(new_goal);
      }
    }
  },

  add_obstacles: function () {
    if (Game.goals.length == 1) {
      var no_to_add = Math.floor(Game.score.value / 20);
      for (var x = no_to_add; x > 0; x--) {
        var new_obstacle = new Static.Obstacle();
        Game.drawables.push(new_obstacle);
        Game.updatables.push(new_obstacle);
      }
    }
  },

  do_script_actions: function () {
    var actions = ScriptActions.for_score(Game.score.value);
    if (actions) {
      actions.forEach(function (action) {
        if (!action.type) {
          ScriptActions[action.func](action)
        }
      });
    }
  },

  end: function () {
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);

    setTimeout(
      function () {
        Game.draw();
        Game.health.draw();
        Canvas.draw_text(
          "GAME OVER!",
          512,
          200,
          "#ff0000" ,
          "center",
          100
        );
        Canvas.draw_text(
          "FINAL SCORE: " + Game.score.value,
          512,
          300,
          "#ff0000" ,
          "center",
          100
        );
      },
      500
    )
  }

};