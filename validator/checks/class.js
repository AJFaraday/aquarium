if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.class = function (validator) {
  var errors = [];
  if(validator.behaviour_class.name != 'Behaviour') {
    errors.push('This class should extend the Behaviour class');
  }
  return errors;
};
