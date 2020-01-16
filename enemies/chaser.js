if (typeof Enemies === 'undefined') {
  Enemies = {}
}

Enemies.Chaser = class Chaser extends mix(Concerns.Follower, Concerns.Catchable, Concerns.TailBiter) {
  constructor(x, y) {
    super();
    this.target = Player.head;

    this.x = x;
    this.y = y;
    this.size = 10;
    this.colour = 'rgba(256, 0,0, 0.5)';

    this.turn_speed = 20; // up to 100
    this.speed = 20;
    this.angle = Utils.angleBetweenPoints(this, Player.head);
    this.history = [];
  }

  update() {
    this.move();
    this.bite_tail();
    if (this.caught()) {
      Player.health.decrement(5);
      this.remove();
    }
  };

  get_speed() {
    return this.speed;
  };

  draw() {
    Game.canvas.draw_circle(this);
  };

};
