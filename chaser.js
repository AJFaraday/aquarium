Chaser = function () {
  this.target = new MoveTarget();

  this.x = (1024 / 2);
  this.y = (768 / 2);
  this.size = 10;

  this.turn_speed = 20; // up to 100
  this.speed = 20;
  this.angle = 0;
  this.history = [];

  Object.assign(this, Concerns.Follower);
  Object.assign(this, Concerns.Catchable);

  this.check = function () {
    this.move();
    if (this.caught()) {
      Canvas.health.decrement(2);
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