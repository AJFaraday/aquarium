var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Behaviours = exports.Behaviours;

var Validator = require('./validator.cli.min.js');

Config.index = 2;
Game.init(Config.build_config(Configs.grid));


Object.keys(Behaviours).forEach(
  function(behaviour_name) {
    var validator = new Validator(Behaviours[behaviour_name], behaviour_name);
    validator.check();
  }
);
