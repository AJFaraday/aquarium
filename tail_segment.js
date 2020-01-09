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
  this.active = true;

  Object.assign(this, Follower);

  this.update = function () {
    this.move();
  };

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

  this.check = function () {
    if (this.caught() && this.active) {
      var the_rest_of_the_tail = this.head.tail_segments.slice(
        this.head.tail_segments.indexOf(this),
        (this.head.tail_segments.length - 1)
      );
      for (var segment in the_rest_of_the_tail) {
        the_rest_of_the_tail[segment].active = false;
        setTimeout(
          function () {
            the_rest_of_the_tail[segment].get_bitten();
          },
          (50 * segment)
        );
      }
    }
  };

  this.get_bitten = function () {
    this.head.tail_segments.splice(this.head.tail_segments.indexOf(this), 1);
    Canvas.health.decrement();
  };

  this.caught = function () {
    var distance_to_head = Utils.distanceBetweenPoints(this.x, this.y, Canvas.head.x, Canvas.head.y);
    return (distance_to_head <= Canvas.head.size);
  };
};