var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Behaviours = exports.Behaviours;

var BehaviourBuilder = require('./behaviour_builder');

var exports = require('./validator.cli.min.js');
var Validator = exports.Validator;
var Fetcher = exports.Fetcher;

function get_fetcher() {
  var fetcher = new Fetcher(18632, 'codegolf.meta');
  var interval = setInterval(function () {
      if (fetcher.data) {
        clearInterval(interval);
        build_behaviours(fetcher);
        validate_things();
      }
    },
    10
  );
}

function build_behaviours(fetcher) {
  var builder = new BehaviourBuilder();
  builder.clear_directory();
  builder.move_defaults();
  fetcher.data.items.forEach(
    function(answer) {
      builder.build_behaviour(answer);
    }
  )
}

function validate_things() {
  Config.index = 2;
  Game.init(Config.build_config(Configs.grid));


  Object.keys(Behaviours).forEach(
    function (behaviour_name) {
      var validator = new Validator(Behaviours[behaviour_name], behaviour_name);
      validator.check();
    }
  );
}

get_fetcher();
