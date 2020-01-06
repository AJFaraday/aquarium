Head = function (target) {
  this.target = target;

  this.x = (1024 / 2);
  this.y = (768 / 2);
  this.size = 40;

  this.turn_speed = 40; // up to 100
  this.speed = 10;
  this.angle = 0;

  this.update = function () {
    this.target.update();

    this.get_angle();
    this.x = Math.cos(this.angle * Math.PI / 180) * this.speed + this.x;
    this.y = Math.sin(this.angle * Math.PI / 180) * this.speed + this.y;
  };

  this.get_angle = function () {
    var angle_difference = Utils.angleDifference(this.angle_to_target(), this.angle);

    this.angle -= (angle_difference / (200 / this.turn_speed));
  };

  this.angle_to_target = function () {
    return Utils.angleBetweenPoints(this.x, this.y, target.x, target.y);
  };

  this.debug_draw = function () {
    this.target.draw();

    Utils.drawPolygon(this.x, this.y, 3, 20, 2, 'rgb(0,0,128)', 'rgb(0,0,128)', this.angle_to_target());
    Utils.drawPolygon(this.x, this.y, 3, 20, 2, 'rgb(0,128,0)', 'rgb(0,128,0)', this.angle);
  };

  this.draw = function () {
    Canvas.ctx.lineWidth = 5;
    Canvas.ctx.strokeStyle = 'rgba(0,256,128)';
    Canvas.ctx.beginPath();

    Canvas.ctx.arc(
      this.x,
      this.y,
      this.size,
      0,
      360
    );
    Canvas.ctx.stroke();
  }
};