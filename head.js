Head = function (target) {
  this.target = target;

  this.x = (1024 / 2);
  this.y = (768 / 2);
  this.size = 40;

  this.turn_speed = 40; // up to 100
  this.speed = 20;
  this.angle = 0;
  this.tail_segments = [];
  this.history = [];

  Object.assign(this, Follower);

  this.debug_draw = function () {
    this.target.draw();

    Utils.drawPolygon(this.x, this.y, 3, 20, 2, 'rgb(0,0,128)', 'rgb(0,0,128)', this.angle_to_target());
    Utils.drawPolygon(this.x, this.y, 3, 20, 2, 'rgb(0,128,0)', 'rgb(0,128,0)', this.angle);
  };

  this.update = function() {
    this.target.update();
    this.move();
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].move();
    }
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

  this.check = function() {
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].check();
    }
  };
};