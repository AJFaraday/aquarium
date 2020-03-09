var exports = require('./importer.cli.min.js');
var Fetcher = exports.Fetcher;


var fetcher = new Fetcher(18632, 'codegolf.meta');
fetcher.validate_defaults();
fetcher.get_answers();
