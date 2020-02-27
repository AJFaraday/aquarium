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
    return 'rgb(0,255,255,0.4)';
  }

  set_target() {
    if (this.food().length == 0) {
      this.idle()
    } else {
      this.target({x: 200, y: 200});
    }
  }

  target_removed() {
    this.set_target();
  }

  eat() {
    this.set_target();
  }

};
