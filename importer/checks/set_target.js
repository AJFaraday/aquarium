if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.set_target = function (validator) {
  var errors = [];
  var set_target = validator.behaviour_class.prototype.set_target;
  if(typeof set_target == 'function') {
    var text = set_target.toString();
    if(!text.includes('this.target(')) {
      errors.push('Behaviour.set_target() should call this.target()')
    }
  } else {
    errors.push('Behaviour should have a function named set_target()')
  }
  return errors;
};