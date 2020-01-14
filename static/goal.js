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
      Game.score.increment();
      Game.add_goals();
      Game.add_obstacles();
      Game.head.increase_difficulty();
      Game.head.grow_tail();
    }
  };

  this.remove = function () {
    Game.checkables.splice(Game.checkables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.goals.splice(Game.goals.indexOf(this), 1);
  };
};