
var exports = require('./aquarium.cli.min');
Game = exports.Game;
Config = exports.Config;
Configs = exports.Configs;
Behaviours = exports.Behaviours;

class Validator {

  constructor(behaviour_class) {
    Config.index = Object.keys(Behaviours).indexOf(behaviour_class.name);
    Game.init(Config.build_config(Configs.grid));
    this.errors = [];
    this.behaviour_class = behaviour_class;

    try {
      this.snake = new Creatures.Snake(behaviour_class);
      this.behaviour = this.snake.behaviour;
      this.behaviour_name = Object.getPrototypeOf(this.behaviour).constructor.name;
    } catch(er) {
      this.errors.push("Couldn't initialize snake, this error is seen: " + er);
    }
  }

  check() {
    if (!this.valid()) {
      console.log('Errors: ' + this.errors.join('\n'));
      return
    }
    var validator = this;
    console.log('Checking ' + this.behaviour_name);
    Object.keys(Validator.checks).forEach(
      function(check_name) {
        var check = Validator.checks[check_name];
        try {
          validator.add_error_array(check(validator));
        } catch(error) {
          validator.add_error("Error running check '" + check_name + "': " + error)
        }
      }
    );
    if(!this.valid()) {
      console.log('Errors: ' + this.errors.join('\n'));
    }
  }

  add_error(error) {
    this.errors.push(error);
  }

  add_error_array(errors) {
    this.errors = this.errors.concat(errors);
  }

  valid() {
    return (this.errors.length == 0);
  }

}