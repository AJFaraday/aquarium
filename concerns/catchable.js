if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = class Catchable {
  constructor() {

  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
  }

  caught() {
    return Utils.touching(this, Player.head);
  }
};
