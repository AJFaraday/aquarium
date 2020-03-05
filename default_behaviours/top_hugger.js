if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.TopHugger = class TopHugger extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Top Hugger';
  }

  colour() {
    return 'rgba(255,128,0,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.food().length == 0) {
      this.idle()
    } else {
      var heights = this.food().map(function (food) {
        return food.y;
      });
      var min_height = Math.min(...heights);
      this.target(this.food()[heights.indexOf(min_height)]);
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
