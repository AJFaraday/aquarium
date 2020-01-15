if (typeof Static === 'undefined') {
  Static = {}
}

Static.Obstacle = function () {
  this.x = Math.floor(Math.random() * 1024);
  this.y = Math.floor(Math.random() * 768);
  this.size = 6;
  this.colour = 'rgba(256, 0, 0, 0.8)';

  Object.assign(this, Concerns.Catchable);

  this.draw = function () {
    Game.canvas.draw_square(this);
  };

  this.update = function () {
    if (this.caught()) {
      // increase score
      this.remove();

      Player.head.increase_difficulty();
      Player.health.decrement(1);
    }
  };

};