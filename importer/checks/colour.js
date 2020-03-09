if (typeof Validator.checks == 'undefined') {
  Validator.checks = [];
}

Validator.checks.colour = function (validator) {
  var errors = [];
  var colour = validator.behaviour.colour();
  if (typeof colour == 'string') {
    var regex = /rgba\(([0-9]+),([0-9]+),([0-9]+),([0-9\.]+)\)/gm;
    var parts = regex.exec(colour);
    if (parts) {
      var colours = [parts[1], parts[2], parts[3]];
      ['red', 'green', 'blue'].forEach(
        function (colour, i) {
          var colour_value = parseFloat(colours[i]);
          if (colour_value > 255) {
            errors.push("colour(): " + colour + " must be between 0 and 255. It's currently " + colour_value);
          }
        }
      );

      var alpha = parts[4];
      if (alpha < 0.3 || alpha > 0.5) {
        errors.push("colour(): Alpha value should be between 0.3 and 0.5, currently it's " + alpha);
      }

    } else {
      errors.push("colour() function should return a valid rgba colour. Returns '" + colour + "'");
    }
  } else {
    errors.push('Behaviour should have a colour() method returning a string')
  }

  return errors;
};