if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.HighRotation = class HighRotation extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'High Rotation';
  }

  colour() {
    return 'rgba(128,0,128,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.food().length == 0) {
      this.idle()
    } else {
      var angles = this.food().map(function (food) {
        var angle = behaviour.utils().angleBetweenPoints(food, behaviour.snake());
        return Math.abs(behaviour.utils().angleDifference(angle, behaviour.angle()));
      });
      var max_angle = Math.min(...angles);
      this.target(behaviour.food()[angles.indexOf(max_angle)]);
    }
  }

  target_removed() {
    this.set_target();
  }

  eat_target() {
    this.set_target();
  }

};
