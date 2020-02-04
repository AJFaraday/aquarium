if (typeof Creatures === 'undefined') {
  Creatures = {}
}

Creatures.Chaser = class Chaser extends mix(Concerns.Follower, Concerns.Catchable, Concerns.TailBiter, Concerns.LifeSpan) {
  constructor(x, y) {
    super();
    this.target = Player.head;

    this.x = x;
    this.y = y;
    this.size = 20;
    this.life_span = 1000;

    this.colour = 'rgba(255,0,0,0.6)';
    this.turn_speed = 20; // up to 100
    this.speed = 15;
    this.angle = Utils.angleBetweenPoints(this, Player.head);
    this.history = [];
    Game.updatables.push(this);
    Game.drawables.push(this);
    Game.creatures.push(this);
    this.birth_tick = Game.tick;
  }

  update() {
    this.move();
    this.bite_tail();
    if (this.caught()) {
      Player.health.decrement(5);
      this.remove();
    }
    this.check_lifespan();
  };

  get_speed() {
    return this.speed;
  };

  draw() {
    Game.canvas.draw_circle(this);
  };

};
