/*
A follower will have

- x
- y
- target (which has x and y)
- speed
- turn speed

And it's applied to another object with

  Object.assign(this, Follower);

 */
Follower = {
  move: function () {
    this.get_angle();
    this.x = Math.cos(this.angle * Math.PI / 180) * this.speed + this.x;
    this.y = Math.sin(this.angle * Math.PI / 180) * this.speed + this.y;

    this.history.push({x: this.x, y: this.y});
    if (this.history.length >= 5) {
      this.history.shift();
    }
  },

  get_angle: function () {
    var angle_difference = Utils.angleDifference(this.angle_to_target(), this.angle);

    this.angle -= (angle_difference / (200 / this.turn_speed));
  },

  angle_to_target: function () {
    return Utils.angleBetweenPoints(this.x, this.y, this.target.x, this.target.y);
  }

};