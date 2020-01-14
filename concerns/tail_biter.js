if (typeof Concerns === 'undefined') {
  Concerns = {}
}

Concerns.TailBiter = {
  bite_tail: function () {
    var me = this;
    Game.head.tail_segments.forEach(
      function (segment) {
        var distance_to_segment = Utils.distanceBetweenPoints(me.x, me.y, segment.x, segment.y);
        if (distance_to_segment <= segment.size && segment.active) {
          segment.get_bitten();
          me.remove();
        }
      }
    );
  }

};
