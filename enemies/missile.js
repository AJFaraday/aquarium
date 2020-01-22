if (typeof Enemies === 'undefined') {
  Enemies = {}
}

Enemies.Missile = class Missile extends mix(Concerns.Follower, Concerns.Catchable, Concerns.TailBiter) {
  constructor(x, y) {
    super();
    this.target = Player.head;

    this.x = x;
    this.y = y;
    this.size = 20;

    this.turn_speed = 0; 
    this.speed = 50;
    this.angle = Utils.angleBetweenPoints(this, Player.head);
    this.history = [];
    Game.updatables.push(this);
    Game.drawables.push(this);
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
    Game.canvas.draw_triangle(this);
  };

};
