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

  set_target() {
    if (Game.food.length > 0) {
      //this.target = this.random_food();
      if(typeof this.strategy === 'undefined') {
        this.target = this.random_food();
      } else {
        this.target = this[this.strategy]();
      }
    } else {
      // todo choose somewhere nearby
      this.target = {
        x: ((Math.random() * 200) - 100) + this.x,
        y: ((Math.random() * 200) - 100) + this.y
      }
    }
  }

  nearest_food() {
    var eater = this;
    var distances = Game.food.map(function (food) {
      return Utils.distanceBetweenPoints(eater, food);
    });
    var min_distance = Math.min(...distances);
    return Game.food[distances.indexOf(min_distance)];
  }

  farthest_food() {
    var eater = this;
    var distances = Game.food.map(function (food) {
      return Utils.distanceBetweenPoints(eater, food);
    });
    var max_distance = Math.max(...distances);
    return Game.food[distances.indexOf(max_distance)];
  }

  random_food() {
    return Game.food[Math.floor(Math.random() * Game.food.length)]
  }

  eat() {
    this.speed += 0.1;
    this.set_target();
    this.grow_tail();
  };

};