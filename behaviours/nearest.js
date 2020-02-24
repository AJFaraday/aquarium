if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Nearest = class Nearest extends (Behaviour) {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Nearest Food';
  }

  colour() {
    return 'rgb(255,0,0,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.food().length == 0) {
      this.idle()
    } else {
      var distances = this.food().map(function (food) {
        return behaviour.utils().distanceBetweenPoints(behaviour.snake, food);
      });
      var min_distance = Math.min(...distances);
      this.target(this.food()[distances.indexOf(min_distance)]);
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
