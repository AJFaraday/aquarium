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
    if (this.strategy.see_new == 'retarget') {
      this.set_target();
    }
  }

  set_target() {
    if (Game.food.length > 0) {
      if (typeof this.strategy === 'undefined') {
        this.target = this.random_food();
      } else {
        this.target = this[this.strategy.target_type]();
      }
    } else {
      // todo choose somewhere nearby
      this.target = {
        x: this.x,
        y: this.y
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

  nearest_snake() {
    var eater = this;
    var distances = Game.creatures.map(function (creature) {
      if (creature == eater) {
        return 99999;
      }
      return Utils.distanceBetweenPoints(eater, creature);
    });
    var min_distance = Math.min(...distances);
    return Game.creatures[distances.indexOf(min_distance)];
  }


  highest_food() {
    var eater = this;
    var heights = Game.food.map(function (food) {
      return food.y;
    });
    var min_height = Math.min(...heights);
    return Game.food[heights.indexOf(min_height)];
  }

  least_rotation() {
    this.get_angle();
    var eater = this;
    var angles = Game.food.map(function (food) {
      var angle = Utils.angleBetweenPoints(food, eater);
      return Math.abs(Utils.angleDifference(angle, eater.angle));
    });

    var min_angle = Math.max(...angles);
    return Game.food[angles.indexOf(min_angle)];
  }

  most_rotation() {
    this.get_angle();
    var eater = this;
    var angles = Game.food.map(function (food) {
      var angle = Utils.angleBetweenPoints(food, eater);
      return Math.abs(Utils.angleDifference(angle, eater.angle));
    });

    var max_angle = Math.min(...angles);
    return Game.food[angles.indexOf(max_angle)];
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
    this.health += 1;
    this.speed += 0.1;
    this.set_target();
    this.grow_tail();
  };

};