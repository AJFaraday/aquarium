// Previous could be a head, or the next closest tail segment to the head.
TailSegment = function (previous, head) {
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

  Object.assign(this, Concerns.Follower);

  this.draw = function () {
    Canvas.draw_circle(this);
  };

  this.get_speed = function () {
    return this.head.speed;
  };

  this.update = function () {

  };

  this.get_bitten = function () {
    Player.health.decrement(this.head.tail_segments.length - this.head.tail_segments.indexOf(this));
    this.head.tail_segments.splice(
      this.head.tail_segments.indexOf(this),
      this.head.tail_segments.length - 1
    );
  }

};