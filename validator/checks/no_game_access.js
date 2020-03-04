if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.no_game_access = function (validator) {
  var errors = [];
  var code = validator.behaviour_class.toString();

  var forbidden_objects = ['Game', 'Config', 'Configs', 'Behaviours', 'Concerns','Static', 'Canvas'];
  forbidden_objects.forEach(
    function(forbidden) {
      if (code.includes(forbidden)) {
        errors.push('Behaviour should not try to directly call game components. It references "' + forbidden+ '"');
      }
    }
  );

  return errors;
};