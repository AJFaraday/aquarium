class BehaviourBuilder {
  constructor() {
    this.fs = require('fs-extra');
  }

  clear_directory() {
    this.fs.removeSync('/behaviours/*')
  }

  move_defaults() {
    this.fs.copySync('./default_behaviours', './behaviours');
  }


  write_to_file(file_name, code) {
    try {

      // TODO validate here!
      this.fs.outputFileSync('./behaviours/' + file_name, code);
    } catch(er) {
      // Log to file
      console.log("Not importing " + user + ": " + title + " - Code couldn't be evaluated");
    }
  }

}

module.exports = BehaviourBuilder;