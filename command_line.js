// First run:
// export NODE_PATH=/usr/lib/node_modules

var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;

function run_config(config) {
  require('./lib/seedrandom.min.js')('aquarium', {global: true});
  Game.init(Config.build_config(config));
  Game.config.min_snakes = 0;
  while (Game.snakes.length > 1) {
    Game.update();
  }
  console.log("Winner is: " + Game.snakes[0].name);
}

run_config(Configs.royale);
run_config(Configs.swarm);

var grid_configs = Config.build_config_for_all(Configs.grid);
grid_configs.forEach(
  function (config) {
    run_config(config);
  }
);


