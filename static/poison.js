if (typeof Static === 'undefined') {
  Static = {}
}

Static.Poison = class Poison extends Concerns.Catchable {

  constructor () {
    super();
    this.x = Math.floor(Math.random() * Game.width);
    this.y = Math.floor(Math.random() * Game.height);
    this.size = 6;
    this.colour = 'rgba(256, 0, 0, 0.8)';
    Game.drawables.push(this);
    Game.updatables.push(this);
  }

  draw() {
    Game.canvas.draw_square(this);
  };

  update () {
    if (this.caught()) {
      this.remove();
      Player.increase_difficulty();
      Player.health.decrement(1);
    }
  };

};