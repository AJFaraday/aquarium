if (typeof Static === 'undefined') {
  Static = {}
}

Static.Ghost = class Ghost {

  constructor(src) {
    this.x = src.x;
    this.y = src.y;
    this.size = src.size;
    this.colour = src.colour.replace(/0\.[0-9]/, '0.1');
    Game.drawables.push(this);
  }

  draw() {
    Game.canvas.draw_circle(this);
  }

} ;

