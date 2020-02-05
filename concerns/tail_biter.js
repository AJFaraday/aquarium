if (typeof Concerns === 'undefined') {
  Concerns = {}
}

Concerns.TailBiter = class TailBiter {
  constructor() {

  }

  bite_tail() {
    var me = this;
    Game.creatures.forEach(
      function(creature) {
        if (creature.tail_segments) {
          creature.tail_segments.forEach(
            function (segment) {
              if (Utils.touching(me, segment) && segment.active) {
                me.bite(creature);
                segment.get_bitten();
                creature.get_bitten();
              }
            }
          );
        }
      }
    );
  }



};
