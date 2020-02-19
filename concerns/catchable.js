if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = class Catchable {
  constructor() {

  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.snakes.splice(Game.snakes.indexOf(this), 1);
  }

  caught_by() {
    var catchable = this;
    return Game.snakes.find(
      function(snake) {
        return Utils.touching(catchable, snake);
      }
    )
  };

  caught() {
    //return Utils.touching(this, Player.head);
    var catchable = this;
    var result = false
    Game.snakes.forEach(
      function(snake) {
        if (Utils.touching(catchable, snake)) {
          result = true;
        }
      }
    );
    return result;
  }
};
