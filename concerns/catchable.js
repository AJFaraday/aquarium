if (typeof Concerns === 'undefined') {Concerns = {}}

Concerns.Catchable = {

  remove: function () {
    Canvas.checkables.splice(Canvas.checkables.indexOf(this), 1);
    Canvas.drawables.splice(Canvas.drawables.indexOf(this), 1);
  },

  caught: function () {
    var distance_to_head = Utils.distanceBetweenPoints(this.x, this.y, Canvas.head.x, Canvas.head.y);
    return (distance_to_head <= Canvas.head.size);
  }

};
