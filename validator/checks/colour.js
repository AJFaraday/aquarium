if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.colour = function (validator) {
  var errors = [];
  var colour = validator.behaviour.colour();
  if (typeof colour == 'string') {
    var regex = /rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)\)/gm;
    var parts = regex.exec(colour);
    var red = parts[1];
    var green = parts[2];
    var blue = parts[3];
    var alpha = parts[4];
    // TODO check rgb are from 0 to 255
    // TODO check alpha is exactly 0.4
  } else {
    errors.push('Behaviour should have a colour() method returning a string')
  }

  return errors;
};