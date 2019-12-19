Canvas = {
  init: function () {
    var canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');

    Canvas.mouse = {
      x: innerWidth / 2,
      y: innerHeight / 2
    };

    window.onmousemove = function (e) {
      Canvas.mouse.x = e.clientX - 10;
      Canvas.mouse.y = e.clientY - 10;
    };

    Canvas.head = new Head(new Target());
    setInterval(
      function () {
        requestAnimationFrame(Canvas.draw)
      },
      10
    );

    setInterval(
      Canvas.update,
      100
    );
  },

  update: function () {
    Canvas.head.update();
  },

  draw: function () {
    Canvas.ctx.clearRect(0, 0, 1024, 768);
    // debugging
    Canvas.head.debug_draw();
    // important
    Canvas.head.draw();
  }
};