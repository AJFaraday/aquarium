if (typeof Static === 'undefined') {
  Static = {}
}

Static.Text = class Text {

  constructor(text, x, y, size, align) {
    this.text = text;
    this.size = size;
    this.x = x;
    this.y = y;
    this.align = align;
  }

  draw() {
    Game.canvas.draw_text(
      this.text,
      this.x,
      this.y,
      'rgba(0,0,0,0.3)',
      this.align,
      this.size
    )
  }

};