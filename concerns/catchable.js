if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = class Catchable {
  constructor() {

  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.creatures.splice(Game.creatures.indexOf(this), 1);
  }

  caught_by() {
    var catchable = this;
    return Game.creatures.find(
      function(creature) {
        return Utils.touching(catchable, creature);
      }
    )
  };

  caught() {
    //return Utils.touching(this, Player.head);
    var catchable = this;
    var result = false
    Game.creatures.forEach(
      function(creature) {
        if (Utils.touching(catchable, creature)) {
          result = true;
        }
      }
    );
    return result;
  }
};
