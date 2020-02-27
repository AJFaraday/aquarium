if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Failure = class Failure extends (Behaviour) {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'fail';
  }

  colour() {
    return 'rgb(0,0,255,0.4)';
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
