// First run:

var fs = require('fs-extra');
var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Stats = exports.Stats;

// {behaviour_name: {name: behaviour_name, wins; [config.name], score:}}
var overall_stats = {};

/*
var matches = [
  {
    name: config.name,
    logs: ['[1000] X was bitten by Y'],
    scores: {
      behaviour_name: {
        name: behaviour_name,
        total: 0,
        snakes: 0,
        average: 0
      }
    },
    config: config.id,
    snake: Config.current_behaviour()[0].name
    opponent: Config.current_opponent()[0].name
  }
];
*/
var matches = [];


function run_config(config) {
  var old_console = console;

  console = {
    lines: [],
    clear: function() {
      this.lines = [];
    },
    log: function(str) {
      this.lines.push(str);
      old_console.log(str);
    }
  };

  require('./lib/seedrandom.min.js')('aquarium', {global: true});
  console.log('===============');
  Game.init(Config.build_config(config));
  Game.config.min_snakes = 0;
  console.clear();
  while(!Game.ended) {
    Game.update();
  }
  var match = {
    name: config.name, 
    config: config.id,
    snake: config.snake,
    opponent: config.opponent,
    logs: console.lines, 
    scores: {}
  };
  console = old_console;
  var stats = Object.values(Stats.stats).sort((a, b) => (a.average_score() < b.average_score()) ? 1 : -1);
  stats.forEach(
    function(stat) {
      console.log(
        stat.behaviour_name.rightJustify(21) + ': ' +
        stat.total_score.toString().rightJustify(3) + ' / ' +
        stat.total_snakes.toString().leftJustify(2) + ' = ' +
        stat.average_score()
      );
      match.scores[stat.behaviour_name] = {
        name: stat.behaviour_name,
        total: stat.total_score,
        snakes: stat.total_snakes,
        average: stat.average_score()
      };
      if (typeof overall_stats[stat.behaviour_name] == 'undefined') {
        overall_stats[stat.behaviour_name] = {name: stat.behaviour_name, behaviour_key: stat.behaviour_key, wins: [], score: 0};
      }
      overall_stats[stat.behaviour_name].score += stat.average_score();
    }
  );
  matches.push(match);
  overall_stats[stats[0].behaviour_name].wins.push(config.name);
  console.log("Winner is: " + stats[0].behaviour_name);
}

run_config(Configs.royale);
run_config(Configs.big);

var grid_configs = Config.build_config_for_all(Configs.grid);
grid_configs.forEach(
  function(config) {
    run_config(config);
  }
);

var swarm_configs = Config.build_config_for_all(Configs.swarm);
swarm_configs.forEach(
  function(config) {
    run_config(config);
  }
);

var versus_configs = Config.build_config_for_all_pairs(Configs.duel);
versus_configs.forEach(
  function(config) {
    run_config(config);
  }
);

versus_configs = Config.build_config_for_all_pairs(Configs.one_vs_five);
versus_configs.forEach(
  function(config) {
    run_config(config);
  }
);

versus_configs = Config.build_config_for_all_pairs(Configs.vs_famine);
versus_configs.forEach(
  function(config) {
    run_config(config);
  }
);

fs.outputFile('data/matches.js', ('match_data=' + JSON.stringify(matches)));

var final_stats = Object.values(overall_stats).sort((a, b) => (a.score < b.score ? 1 : -1));
fs.outputFile('data/scores.js', ('score_data=' + JSON.stringify(final_stats)));
