if (typeof Player === 'undefined') {
  Player = {}
}

Player.Head = function () {
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

  Object.assign(this, Concerns.Follower);
  Object.assign(this, Concerns.TailBiter);

  this.update = function() {
    this.move();
    this.bite_tail();
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].move();
    }
  };

  this.draw = function () {
    Canvas.draw_circle(this);
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].draw();
    }
  };

  this.get_speed = function() {
    return this.speed;
  };

  //////////////

  this.grow_tail = function () {
    var target = this.tail_segments[this.tail_segments.length - 1];
    if (target == null) {
      target = this;
    }
    this.tail_segments.push(new TailSegment(target, this));
  };

  this.increase_difficulty = function () {
    this.speed += 0.5;
  };

  this.remove = function() {
    // Player head can never be removed
    // Called in Concerns.TailBiter
  }
};