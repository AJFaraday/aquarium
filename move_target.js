MoveTarget = function () {

  this.x = 0;
  this.y = 0;
  this.size = 0;

  this.draw = function () {
    Canvas.ctx.strokeStyle = 'rgba(0, 0, 256, 0.8)';
    Canvas.ctx.strokeRect(
      (this.x - 5),
      (this.y - 5),
      10,
      10
    );
  }
};