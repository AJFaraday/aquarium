if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Invalid = class Invalid extends Behaviour {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Random FoodRandom FoodRandom FoodRandom FoodRandom FoodRandom FoodRandom Food';
  }

  colour() {
    return 'rgba(255,255,255,0.4)';
  }

  set_target() {
    this.food([0]);
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
