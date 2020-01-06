Goal = function () {
  this.x = Math.floor(Math.random() * 1024);
  this.y = Math.floor(Math.random() * 768);
  this.size = 20;

  this.draw = function () {
    Canvas.ctx.strokeStyle = 'rgba(0, 256, 256, 0.8)';
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
      Canvas.score.increment();
      Canvas.add_goals();
    }
  };

  this.caught = function () {
    var distance_to_head = Utils.distanceBetweenPoints(this.x, this.y, Canvas.head.x, Canvas.head.y);
    return (distance_to_head <= Canvas.head.size);
  };

  this.remove = function () {
    Canvas.goals.splice(Canvas.goals.indexOf(this), 1);
  };
};