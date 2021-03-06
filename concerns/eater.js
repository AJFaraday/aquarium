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
      this.behaviour.set_target();
    } else {
      this.behaviour.idle();
    }
  }

  eat(food) {
    this.last_ate_tick = Game.tick;
    this.health += 1;
    this.speed += 0.1;
    this.grow_tail();
    this.score_point();
    this.behaviour.eat();
    if (food == this.target) {
      this.behaviour.eat_target();
    }
  };

};