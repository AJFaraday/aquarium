if (typeof Static === 'undefined') {Static = {}}

Static.Goal = function () {
  this.x = Math.floor(Math.random() * 1024);
  this.y = Math.floor(Math.random() * 768);
  this.size = 20;

  Object.assign(this, Concerns.Catchable);

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
      Canvas.add_obstacles();
      Canvas.head.increase_difficulty();
      Canvas.head.grow_tail();
    }
  };

  this.remove = function () {
    Canvas.checkables.splice(Canvas.checkables.indexOf(this), 1);
    Canvas.drawables.splice(Canvas.drawables.indexOf(this), 1);
    Canvas.goals.splice(Canvas.goals.indexOf(this), 1);
  };
};