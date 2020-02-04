if (typeof Concerns === 'undefined') {Concerns = {}}

/*

An eater will have

x
y
target (With x and y)

*/

Concerns.Eater = class Eater {

  set_target() {
    if(Game.food.length > 0) {
      // randomly pick a food
      this.target = Game.food[Math.floor(Math.random() * Game.food.length)];
    } else {
      // todo choose somewhere nearby
      this.target = {
        x: ((Math.random() * 200) - 100) + this.x,
        y: ((Math.random() * 200) - 100) + this.y
      }
    }
  }

  eat() {
    this.speed += 0.1;
    this.set_target();
    this.grow_tail();
  };

};