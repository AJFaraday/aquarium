if (typeof Concerns === 'undefined') {
  Concerns = {}
}

Concerns.TailBiter = class TailBiter {
  constructor() {

  }

  bite_tail() {
    var me = this;
    Game.snakes.forEach(
      function(snake) {
        if (snake.tail_segments) {
          snake.tail_segments.forEach(
            function (segment) {
              if (Utils.touching(me, segment) && segment.active) {
                me.bite(snake);
                segment.get_bitten();
                snake.get_bitten_by(me);
              }
            }
          );
        }
      }
    );
  }



};
