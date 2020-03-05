var exports = require('./aquarium.cli.min');
var Game = exports.Game;
var Config = exports.Config;
var Configs = exports.Configs;
var Behaviours = exports.Behaviours;
var Behaviour = exports.Behaviour;

class BehaviourBuilder {
  constructor() {
    this.fs = require('fs-extra');
    this.parser = require('node-html-parser');
  }

  clear_directory() {
    this.fs.removeSync('/behaviours.js')
  }

  move_defaults() {
    this.fs.copySync('./default_behaviours', './behaviours');
  }

  build_behaviour(answer) {
    var id = answer.answer_id;
    var user = answer.owner.display_name.toLowerCase().replace(' ', '_');
    var doc = this.parser.parse(answer.body, {pre: true});
    var title = doc.querySelector('h1').text;
    console.log("Importing answer " + id + " from " + user + " entitled '" + title + "'");
    var code = doc.querySelector('pre').text;
    code = code.replace('<code>', '');
    code = code.replace('</code>', '');
    try {
      eval(code);
      var file_name = title.toLowerCase().replace(' ', '_') + '.js';
      // TODO validate here!
      this.fs.outputFileSync('./behaviours/' + file_name, code);
    } catch(er) {
      // Log to file
      console.log("Not importing " + user + ": " + title + " - Code couldn't be evaluated");
    }
  }
}

module.exports = BehaviourBuilder;