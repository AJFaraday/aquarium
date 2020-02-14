// First run:
// export NODE_PATH=/usr/lib/node_modules

var Game = require('./aquarium.cli.min');

Game.init();
while(Game.creatures.length > 1) {
  Game.update();
}
console.log("Winner is: " + Game.creatures[0].strategy.target_type)

