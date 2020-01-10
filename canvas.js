Canvas = {
  init: function () {
    var canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');

    Canvas.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    window.onmousemove = function (e) {
      var rect = canvas.getBoundingClientRect();
      Canvas.mouse.x = e.clientX - rect.left;
      Canvas.mouse.y = e.clientY - rect.top;
    };

    window.onmouseup = function (e) {
      var rect = canvas.getBoundingClientRect();
      Canvas.mouse.x = e.clientX - rect.left;
      Canvas.mouse.y = e.clientY - rect.top;
    };

    Canvas.head = new Head(new MoveTarget());

    Canvas.score = new Score();
    Canvas.health = new Health();

    Canvas.drawables = [];
    Canvas.checkables = [];

    Canvas.goals = [];
    Canvas.add_goals();
    //Canvas.obstacles = [];

    Canvas.draw_loop = setInterval(
      function () {
        requestAnimationFrame(Canvas.draw)
      },
      10
    );
    Canvas.update_loop = setInterval(Canvas.update, 100);
  },

  stop: function () {
    clearInterval(Canvas.draw_loop);
    clearInterval(Canvas.update_loop);

    setTimeout(
      function () {
        Canvas.draw();
        Canvas.health.draw();
        Canvas.ctx.fillStyle = "#ff0000";
        Canvas.ctx.textAlign = "center";
        Canvas.ctx.font = ("100px Arial");
        Canvas.ctx.fillText("GAME OVER!", 512, 200);
        Canvas.ctx.fillText("FINAL SCORE: " + Canvas.score.value, 512, 300);
      },
      500
    )
  },

  update: function () {
    Canvas.head.update();

    Canvas.checkables.forEach(
      function(checkable) {
        checkable.check();
      }
    );
    Canvas.head.check();
  },

  draw: function () {
    Canvas.ctx.clearRect(0, 0, 1024, 768);

    Canvas.head.draw();
    Canvas.score.draw();
    Canvas.health.draw();
    Canvas.drawables.forEach(
      function (drawable) {
        drawable.draw();
      }
    );
    Canvas.do_script_actions()
  },


  do_script_actions: function () {
    var actions = ScriptActions.for_score(Canvas.score.value);
    if (actions) {
      actions.forEach(function (action) {
        if (!action.type) {
          ScriptActions[action.func](action)
        }
      });
    }
  },
  ////////////////////////////

  add_goals: function () {
    if (Canvas.goals.length == 0) {
      var no_to_add = Math.floor(Canvas.score.value / 10) + 1;
      for (var x = no_to_add; x > 0; x--) {
        var new_goal = new Goal();
        Canvas.drawables.push(new_goal);
        Canvas.checkables.push(new_goal);
        Canvas.goals.push(new_goal);
      }
    }
  },

  add_obstacles: function () {
    if (Canvas.goals.length == 1) {
      var no_to_add = Math.floor(Canvas.score.value / 20);
      for (var x = no_to_add; x > 0; x--) {
        var new_obstacle = new Obstacle();
        Canvas.drawables.push(new_obstacle);
        Canvas.checkables.push(new_obstacle);
      }
    }
  }


};