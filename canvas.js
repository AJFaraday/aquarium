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

    Canvas.head = new Head(new MoveTarget());

    Canvas.score = new Score();
    Canvas.health = new Health();

    Canvas.goals = [];
    Canvas.add_goals();
    Canvas.obstacles = [];

    Canvas.draw_loop = setInterval(
      function () {
        requestAnimationFrame(Canvas.draw)
      },
      10
    );
    Canvas.update_loop = setInterval(Canvas.update, 100);
  },

  stop: function() {
    Canvas.health.draw();
    Canvas.ctx.fillStyle = "#ff0000";
    Canvas.ctx.font = ("100px Arial");
    Canvas.ctx.fillText("YOU LOSE!", 250, 200);
    Canvas.ctx.fillText("FINAL SCORE: " + Canvas.score.value, 120, 300);
    clearInterval(Canvas.draw_loop);
    clearInterval(Canvas.update_loop);
  },

  update: function () {
    Canvas.head.update();

    for (var goal in Canvas.goals) {
      Canvas.goals[goal].check()
    }
    for (var obstacle in Canvas.obstacles) {
      Canvas.obstacles[obstacle].check()
    }
  },

  draw: function () {
    Canvas.ctx.clearRect(0, 0, 1024, 768);
    // debugging
    //Canvas.head.debug_draw();
    // important
    Canvas.head.draw();
    Canvas.score.draw();
    Canvas.health.draw();
    Canvas.goals.forEach(
      function (goal) {
        goal.draw();
      }
    );
    Canvas.obstacles.forEach(
      function (obstacle) {
        obstacle.draw();
      }
    );
  },

  ////////////////////////////

  add_goals: function () {
    if (Canvas.goals.length == 0) {
      var no_to_add = Math.floor(Canvas.score.value / 10) + 1;
      for (var x = no_to_add; x > 0; x--) {
        Canvas.goals.push(new Goal())
      }
    }
  },

  add_obstacles: function () {
    var no_to_add = Math.floor(Canvas.score.value / 20);
    for (var x = no_to_add; x > 0; x--) {
      Canvas.obstacles.push(new Obstacle())
    }
  }


};