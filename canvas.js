Canvas = {
  init: function () {
    Canvas.canvas = document.getElementById('canvas');
    Canvas.ctx = canvas.getContext('2d');
  },

  // source will be an object with x, y, size and colour
  draw_circle: function(source) {
    Canvas.ctx.lineWidth = 5;
    Canvas.ctx.fillStyle = source.colour;
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(
      source.x,
      source.y,
      source.size,
      0,
      360
    );
    Canvas.ctx.fill();
  },

  // source will have x, y, size and colour
  draw_square: function(source) {
    Canvas.ctx.strokeStyle = source.colour;
    Canvas.ctx.strokeRect(
      (source.x - (source.size/2)),
      (source.y - (source.size/2)),
      source.size,
      source.size
    );
  },

  draw_text: function(text, x, y, colour, align, size) {
    Canvas.ctx.font = (size + "px Arial");
    Canvas.ctx.textAlign = align;
    Canvas.ctx.fillStyle = colour;
    Canvas.ctx.fillText(text, x, y);
  },
};