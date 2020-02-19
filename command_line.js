// First run:
// export NODE_PATH=/usr/lib/node_modules

var Game = require('./aquarium.cli.min');
require('seedrandom')('aquarium', {global: true});

Config.min_snakes = 0;

Game.init();
while(Game.creatures.length > 1) {
  Game.update();
}

console.log("Winner is: " + Game.creatures[0].strategy.target_type) ;

