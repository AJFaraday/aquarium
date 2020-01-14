if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = {

  remove: function () {
    Game.checkables.splice(Game.checkables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
  },

  caught: function () {
    var distance_to_head = Utils.distanceBetweenPoints(this.x, this.y, Game.head.x, Game.head.y);
    return (distance_to_head <= Game.head.size);
  }

};
