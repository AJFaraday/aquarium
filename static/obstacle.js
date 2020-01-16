if (typeof Static === 'undefined') {
  Static = {}
}

Static.Obstacle = class Obstacle extends Concerns.Catchable {

  constructor () {
    super();
    this.x = Math.floor(Math.random() * 1024);
    this.y = Math.floor(Math.random() * 768);
    this.size = 6;
    this.colour = 'rgba(256, 0, 0, 0.8)';
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