if (typeof Concerns === 'undefined') {
  Concerns = {}
}

// Objects with a lifespan will have a birth tick and a lifespan
Concerns.LifeSpan = class LifeSpan {
  constructor() {

  }

  check_lifespan() {
    if(Game.tick > (this.birth_tick + this.life_span)) {
      this.remove();
    }
  };
};