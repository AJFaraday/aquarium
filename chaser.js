Chaser = function (x, y) {
  this.target = Game.head;

  this.x = x;
  this.y = y;
  this.size = 10;

  this.turn_speed = 20; // up to 100
  this.speed = 20;
  this.angle = Utils.angleBetweenPoints(this.x, this.y, Game.head.x, Game.head.y);
  this.history = [];

  Object.assign(this, Concerns.Follower);
  Object.assign(this, Concerns.Catchable);
  Object.assign(this, Concerns.TailBiter);

  this.check = function () {
    this.move();
    this.bite_tail();
    if (this.caught()) {
      Game.health.decrement(5);
      this.remove();
    }
  };

  this.get_speed = function() {
    return this.speed;
  };

  this.draw = function () {
    Canvas.ctx.lineWidth = 5;
    Canvas.ctx.fillStyle = 'rgba(256, 0,0, 0.5)';
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      360
    );
    Canvas.ctx.fill();
  };

};
