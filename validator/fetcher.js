const request = require('request');
var exports = require('./aquarium.cli.min.js');
var Behaviour = exports.Behaviour;
var Behaviours = exports.Behaviours;
const BehaviourBuilder = require('./validator/behaviour_builder.js');

class Fetcher {

  constructor(question_id, site) {
    // https://api.stackexchange.com/2.2/questions/18632/answers?site=codegolf.meta&filter=!.FjsvG2X2tViZPCgDuGvW88wrGptD
    this.url = 'https://api.stackexchange.com/2.2/questions/' + question_id +
      '/answers?site=' + site + '&filter=!.FjsvG2X2tViZPCgDuGvW88wrGptD';
    this.builder = new BehaviourBuilder();
    this.parser = require('node-html-parser');
    this.builder.clear_directory();
    this.builder.move_defaults();
  }

  validate_defaults() {
    console.log('Checking Behaviours in default_behaviours/')
    Object.keys(Behaviours).forEach(
      function(behaviour_name){
        console.log('');
        console.log('-----------------------------------------');
        var validator = new Validator(Behaviours[behaviour_name]);
        validator.check();
      }
    )
  }

  get_answers() {
    var fetcher = this;
    request(
      this.url,
      {json: true, gzip: true},
      function (err, res, body) {
        if (err) {
          throw err;
        }
        fetcher.data = body;
        fetcher.import_answers();
      }
    );
  }

  import_answers() {
    console.log('');
    console.log('-----------------------------------------');
    console.log('Checking answers from Stack Exchange');
    var fetcher = this;
    fetcher.data.items.forEach(
      function (answer) {
        try {
          console.log('');
          console.log('-----------------------------------------');
          var id = answer.answer_id;
          var user = answer.owner.display_name.toLowerCase().replace(' ', '_');
          var doc = fetcher.parser.parse(answer.body, {pre: true});
          var title = doc.querySelector('h1').text;
          console.log("Importing answer " + id + " from " + user + " entitled '" + title + "'");
          var code = doc.querySelector('pre').text;
          code = code.replace('<code>', '');
          code = code.replace('</code>', '');
          var klass = fetcher.build_class(title, code);
          Behaviours[title] = klass;
          var validator = new Validator(klass);
          validator.check();
          if(validator.valid()) {
            var file_name = title.toLowerCase().replace(' ', '_') + '.js';
            console.log(title + ' is valid, moving to /behaviours/' + file_name);
            fetcher.builder.write_to_file(file_name, code);
          } else {
            console.log(title + ' could not be imported.')
          }

          console.log('-----------------------------------------');
        } catch (er) {
          var id = answer.answer_id;
          var user = answer.owner.display_name.toLowerCase().replace(' ', '_');
          console.log('Error importing answer' + id + ' by ' + user + ': ' + er);
          console.log('-----------------------------------------');
        }
      }
    )
  }

  build_class(title, code) {
    eval(code);
    var klass = Behaviours[title];
    if (typeof klass == 'function') {
      return klass;
    } else {
      throw title + " can not be imported, it does not add a class to Behaviours with the key " + title;
    }
  }


}
