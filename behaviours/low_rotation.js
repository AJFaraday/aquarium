if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.LowRotation = class LowRotation extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Low Rotation';
  }

  colour() {
    return 'rgba(128,128,128,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.food().length == 0) {
      this.idle();
    } else {
      var angles = this.food().map(function (food) {
        var angle = behaviour.utils().angleBetweenPoints(food, behaviour.snake);
        return Math.abs(behaviour.utils().angleDifference(angle, behaviour.angle()));
      });
      var min_angle = Math.max(...angles);
      this.target(behaviour.food()[angles.indexOf(min_angle)]);
    }
  }

  target_removed() {
    this.set_target();
  }

  eat() {
    this.set_target();
  }

  new_food() {
    this.set_target();
  }

};
