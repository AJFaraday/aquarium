var fs = require('fs-extra');
var path = require('path');
require('./utils.js');

var exports = require('./importer.cli.min.js');
var Validator = exports.Validator;

var file_path = process.argv[2];
var file_name = path.basename(file_path, '.js');
var class_name = file_name.toCamelCase();

var code = fs.readFileSync(file_path, 'utf8');

var klass = Validator.build_class(class_name, code);

var validator = new Validator(klass);
validator.check();
if (validator.valid()) {
  console.log('Congratulations! ' + class_name + ' is valid!');
} else {
  console.log('Sorry. ' + class_name + " has errors and in it's current state would not be imported.")
}
