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

    Canvas.goals = [];
    Canvas.add_goals();

    setInterval(
      function () {
        requestAnimationFrame(Canvas.draw)
      },
      10
    );
    setInterval(Canvas.update, 100);
  },

  update: function () {
    Canvas.head.update();
    Canvas.head.draw();
    for (var goal in Canvas.goals) {
      Canvas.goals[goal].check()
    }
  },

  draw: function () {
    Canvas.ctx.clearRect(0, 0, 1024, 768);
    // debugging
    //Canvas.head.debug_draw();
    // important
    Canvas.head.draw();
    Canvas.score.draw();
    Canvas.goals.forEach(
      function (goal) {
        goal.draw();
      }
    );
  },

  ////////////////////////////

  add_goals: function () {
    var no_to_add = Math.floor(Canvas.score.value / 10) + 1;
    for (var x = no_to_add; x > 0; x--) {
      Canvas.goals.push(new Goal())
    }
  }

};