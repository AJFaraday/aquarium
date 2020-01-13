// Previous could be a head, or the next closest tail segment to the head.
TailSegment = function (previous, head) {
  this.head = head;

  this.x = previous.history[0].x;
  this.y = previous.history[0].y;
  this.speed = previous.speed;
  this.turn_speed = 100;
  this.angle = previous.angle;
  this.target = previous;
  this.size = 30;
  this.history = [];
  this.active = (head.tail_segments.length > 2);

  Object.assign(this, Concerns.Follower);

  this.draw = function () {
    Canvas.ctx.lineWidth = 5;
    Canvas.ctx.fillStyle = 'rgba(0,256,128, 0.3)';
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

  this.get_speed = function () {
    return this.head.speed;
  };

  this.check = function () {

  };

  this.get_bitten = function() {
    Canvas.health.decrement(this.head.tail_segments.length - this.head.tail_segments.indexOf(this));
    this.head.tail_segments.splice(
      this.head.tail_segments.indexOf(this),
      this.head.tail_segments.length - 1
    );
  }

};