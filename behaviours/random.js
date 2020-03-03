if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Random = class Random extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Random Food';
  }

  colour() {
    return 'rgba(0,0,255,0.4)';
  }

  set_target() {
    if (this.food().length == 0) {
      this.idle()
    } else {
      this.target(this.food()[Math.floor(Math.random() * this.food().length)]);
    }
  }

  target_removed() {
    this.set_target();
  }

  eat() {
    this.set_target();
  }

};
