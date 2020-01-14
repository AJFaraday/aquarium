if (typeof Static === 'undefined') {
  Static = {}
}

Static.Goal = function () {
  this.x = Math.floor(Math.random() * 1024);
  this.y = Math.floor(Math.random() * 768);
  this.size = 6;
  this.colour = 'rgba(0, 256, 256, 0.8)';

  Object.assign(this, Concerns.Catchable);

  this.draw = function () {
    Canvas.draw_square(this);
  };

  this.update = function () {
    if (this.caught()) {
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
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.goals.splice(Game.goals.indexOf(this), 1);
  };
};