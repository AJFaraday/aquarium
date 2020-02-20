if (typeof Concerns === 'undefined') {
  Concerns = {}
}

/*

An eater will have

x
y
target (With x and y)
strategy nearest farthest random

*/

Concerns.Eater = class Eater {

  see_new_food() {
    this.behaviour.new_food();
  }

  set_target() {
    if (Game.food.length > 0) {
      this.behaviour.new_food();
    } else {
      this.behaviour.idle();
    }
  }

  eat() {
    this.last_ate_tick = Game.tick;
    this.health += 1;
    this.speed += 0.1;
    this.set_target();
    this.grow_tail();
    this.behaviour.eat();
  };

};