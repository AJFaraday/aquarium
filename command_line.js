// First run:
// export NODE_PATH=/usr/lib/node_modules

var Game = require('./aquarium.cli.min');
require('./lib/seedrandom.min.js')('aquarium', {global: true});
Game.init();
Game.config.min_snakes = 0;
while(Game.snakes.length > 1) {
  Game.update();
}

console.log("Winner is: " + Game.snakes[0].name) ;

