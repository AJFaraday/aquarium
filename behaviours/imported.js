Behaviours.Imported = class Imported extends Behaviour {

  constructor(snake) {
    super(snake);
    this.spot = {
      x: (Math.random() * this.game_width()),
      y: (Math.random() * this.game_height())
    };
  }

  name() {
    return 'ImportedImportedImpo';
  }

  colour() {
    return 'rgba(0,255,255,0.4)';
  }

  set_target() {
    this.target(this.spot);
    //this.target(this.food()[0])
  }

  idle() {
    this.target(this.spot);
  }

};
