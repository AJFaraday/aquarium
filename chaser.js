Chaser = function (x, y) {
  this.target = Game.head;

  this.x = x;
  this.y = y;
  this.size = 10;
  this.colour = 'rgba(256, 0,0, 0.5)';

  this.turn_speed = 20; // up to 100
  this.speed = 20;
  this.angle = Utils.angleBetweenPoints(this, Game.head);
  this.history = [];

  Object.assign(this, Concerns.Follower);
  Object.assign(this, Concerns.Catchable);
  Object.assign(this, Concerns.TailBiter);

  this.update = function () {
    this.move();
    this.bite_tail();
    if (this.caught()) {
      Game.health.decrement(5);
      this.remove();
    }
  };

  this.get_speed = function() {
    return this.speed;
  };

  this.draw = function () {
    Canvas.draw_circle(this);
  };

};
