if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Farthest = class Farthest extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Farthest Food';
  }

  colour() {
    return 'rgba(0,255,0,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.food().length == 0) {
      this.idle()
    } else {
      var distances = this.food().map(function (food) {
        return behaviour.utils().distanceBetweenPoints(behaviour.snake, food);
      });
      var max_distance = Math.max(...distances);
      this.target(this.food()[distances.indexOf(max_distance)]);
    }
  }

  target_removed() {
    this.set_target();
  }

  eat_target() {
    this.set_target();
  }

};
