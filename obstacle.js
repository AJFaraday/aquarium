Obstacle = function () {
  this.x = Math.floor(Math.random() * 1024);
  this.y = Math.floor(Math.random() * 768);

  this.draw = function () {
    Canvas.ctx.strokeStyle = 'rgba(256, 0, 0, 0.8)';
    Canvas.ctx.strokeRect(
      (this.x - 3),
      (this.y - 3),
      6,
      6
    );
  };

  this.check = function () {
    if(this.caught()) {
      // increase score
      this.remove();

      Canvas.head.increase_difficulty();
      Canvas.health.decrement();
    }
  };

  this.caught = function () {
    var distance_to_head = Utils.distanceBetweenPoints(this.x, this.y, Canvas.head.x, Canvas.head.y);
    return (distance_to_head <= Canvas.head.size);
  };

  this.remove = function () {
    Canvas.obstacles.splice(Canvas.obstacles.indexOf(this), 1);
  };
};