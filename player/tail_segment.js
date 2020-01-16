if (typeof Player === 'undefined') {
  Player = {}
}

// Previous could be a head, or the next closest tail segment to the head.
Player.TailSegment = class TailSegment extends mix(Concerns.Follower) {
  constructor(previous, head) {
    super();
    this.head = head;

    this.x = previous.history[0].x;
    this.y = previous.history[0].y;
    this.size = 30;
    this.speed = previous.speed;

    this.colour = 'rgba(0,256,128, 0.3)';
    this.turn_speed = 100;
    this.angle = previous.angle;
    this.target = previous;
    this.history = [];
    this.active = (head.tail_segments.length > 1);

  }

  draw() {
    Game.canvas.draw_circle(this);
  };

  get_speed() {
    return this.head.speed;
  };

  get_bitten() {
    Player.health.decrement(this.head.tail_segments.length - this.head.tail_segments.indexOf(this));
    this.head.tail_segments.splice(
      this.head.tail_segments.indexOf(this),
      this.head.tail_segments.length - 1
    );
  }

};