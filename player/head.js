if (typeof Player === 'undefined') {
  Player = {}
}

Player.Head = class Head extends mix(Concerns.Follower, Concerns.TailBiter) {
  constructor () {
    super();
    this.target = new Player.MoveTarget();

    this.x = (1024 / 2);
    this.y = (768 / 2);
    this.size = 40;
    this.colour = 'rgba(0,256,128, 0.3)';

    this.turn_speed = 40; // up to 100
    this.speed = 20;
    this.angle = 0;
    this.tail_segments = [];
    this.history = [];
  }

  update() {
    this.move();
    this.bite_tail();
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].move();
    }
  }

  draw() {
    Game.canvas.draw_circle(this);
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].draw();
    }
  }

  get_speed() {
    return this.speed;
  }

  //////////////

  grow_tail() {
    var target = this.tail_segments[this.tail_segments.length - 1];
    if (target == null) {
      target = this;
    }
    this.tail_segments.push(new Player.TailSegment(target, this));
  }

  remove() {
    // Player head can never be removed
    // Called in Concerns.TailBiter
  }
};