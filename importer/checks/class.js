if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.class = function (validator) {
  var errors = [];
  Object.getPrototypeOf(validator.behaviour_class).name;
  if(Object.getPrototypeOf(validator.behaviour_class).name != 'Behaviour') {
    errors.push('This class should extend the Behaviour class');
  }
  return errors;
};
