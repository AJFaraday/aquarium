if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.no_console_log = function (validator) {
  var errors = [];

  var code = validator.behaviour_class.toString();
  if (code.includes('console.')) {
    errors.push('Behaviour should not make calls to the console object')
  }

  return errors;
};