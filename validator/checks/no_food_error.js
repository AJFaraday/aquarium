if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.no_food_error = function (validator) {
  var errors = [];

  var old_food = Game.food;
  Game.food = [];

  try {
    validator.behaviour.set_target();
    Game.update();
  } catch (er) {
    errors.push("Behaviour throws an error when there's no food: " + er)
  }

  Game.food = old_food;

  return errors;
};