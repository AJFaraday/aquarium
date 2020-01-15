class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
  }

  // source will be an object with x, y, size and colour
  draw_circle(source) {
    this.ctx.lineWidth = 5;
    this.ctx.fillStyle = source.colour;
    this.ctx.beginPath();

    this.ctx.arc(
      source.x,
      source.y,
      source.size,
      0,
      360
    );
    this.ctx.fill();
  }

  // source will have x, y, size and colour
  draw_square(source) {
    this.ctx.strokeStyle = source.colour;
    this.ctx.strokeRect(
      (source.x - (source.size/2)),
      (source.y - (source.size/2)),
      source.size,
      source.size
    );
  }

  draw_text(text, x, y, colour, align, size) {
    this.ctx.font = (size + "px Arial");
    this.ctx.textAlign = align;
    this.ctx.fillStyle = colour;
    this.ctx.fillText(text, x, y);
  }

  clear() {
    this.ctx.clearRect(0, 0, 1024, 768)
  }
}
