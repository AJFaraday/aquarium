if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.name = function (validator) {
  var errors = [];
  var name = validator.behaviour.name();
  if (typeof name != 'string') {
    errors.push('Behaviour should have a name() method returning a string')
  }
  if (name && name.length > 30) {
    errors.push("Behaviour name() should not be more than 30 characters long")
  }
  if(!name.match(/^[a-z0-9 ]+$/i)) {
    errors.push("Behaviour name() can only contain letters, numbers or spaces")
  }
  return errors;
};