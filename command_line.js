// First run:
// export NODE_PATH=/usr/lib/node_modules

var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Stats = exports.Stats;

function run_config(config) {
  require('./lib/seedrandom.min.js')('aquarium', {global: true});
  console.log('===============');
  Game.init(Config.build_config(config));
  Game.config.min_snakes = 0;
  while (!Game.ended) {
    Game.update();
  }
  var stats = Object.values(Stats.stats).sort((a, b) => (a.average_score() < b.average_score()) ? 1 : -1);
  console.log("Winner is: " + stats[0].behaviour_name);
}

run_config(Configs.royale);
run_config(Configs.big);

var grid_configs = Config.build_config_for_all(Configs.grid);
grid_configs.forEach(
  function (config) {
    run_config(config);
  }
);

var swarm_configs = Config.build_config_for_all(Configs.swarm);
swarm_configs.forEach(
  function (config) {
    run_config(config);
  }
);


var versus_configs = Config.build_config_for_all_pairs(Configs.versus);
versus_configs.forEach(
  function (config) {
    run_config(config);
  }
);