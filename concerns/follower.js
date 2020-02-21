if (typeof Concerns === 'undefined') {Concerns = {}}

/*
A follower will have

- x
- y
- target (which has x and y)
- speed
- turn speed
- history (an array)

And it's applied to another object with

  Object.assign(this, Follower);

 */
Concerns.Follower = class Follower {
  constructor() {
  }
  move() {
    this.get_angle();
    this.x = Math.cos(this.angle * Math.PI / 180) * (this.get_speed() / 7) + this.x;
    this.y = Math.sin(this.angle * Math.PI / 180) * (this.get_speed() / 7) + this.y;

    this.history.push({x: this.x, y: this.y});
    if (this.history.length >= 25) {
      this.history.shift();
    }
    if (this.remove && Utils.outOfRange(this)) {
      console.log(Game.tick + ': ' + this.name + ' removed because it is out of bounds');
      this.remove();
    }
  }

  get_angle() {
    var angle_difference = Utils.angleDifference(this.angle_to_target(), this.angle);
    this.angle -= (angle_difference / (200 / (this.turn_speed / 5)));
    return this.angle;
  }

  angle_to_target() {
    return Utils.angleBetweenPoints(this, this.target);
  }

};
