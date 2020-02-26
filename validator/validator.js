class Validator {

  constructor(behaviour) {
    this.errors = [];
    this.behaviour = behaviour;
  }

  check() {
    console.log(this.behaviour);
  }

}