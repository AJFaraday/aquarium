if (typeof Static === 'undefined') {
  Static = {}
}

Static.Ghost = class Ghost {

  constructor(src) {
    this.x = src.x;
    this.y = src.y;
    this.size = src.size;
    this.colour = Utils.change_alpha(src.colour, 0.1);
    Game.drawables.push(this);
  }

  draw() {
    Game.canvas.draw_circle(this);
  }

} ;

