var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Behaviours = exports.Behaviours;

class Validator {

  constructor(behaviour_name) {
    this.errors = [];
    this.behaviour_name = behaviour_name;
    this.behaviour = new Behaviours[behaviour_name]('dummyval');
  }

  check() {
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
    if(this.errors.length > 0) {
      console.log('Errors: ' + this.errors.join('\n'));
    }
  }

  add_error(error) {
    this.errors.push(error);
  }

  add_error_array(errors) {
    this.errors = this.errors.concat(errors);
  }

}