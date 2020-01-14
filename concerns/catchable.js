if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = {

  remove: function () {
    Game.checkables.splice(Game.checkables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
  },

  caught: function () {
    return Utils.touching(this, Game.head);
  }

};
