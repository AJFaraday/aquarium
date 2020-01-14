if (typeof Concerns === 'undefined') {
  Concerns = {}
}

Concerns.TailBiter = {
  bite_tail: function () {
    var me = this;
    Player.head.tail_segments.forEach(
      function (segment) {
        if (Utils.touching(me, segment) && segment.active) {
          segment.get_bitten();
          me.remove();
        }
      }
    );
  }

};
