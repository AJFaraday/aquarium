if (typeof Behaviours === 'undefined') {
  Behaviours = {}
}

Behaviours.Parasite = class Parasite extends (Behaviour) {

  constructor(snake) {
    super(snake);
  }

  name() {
    return 'Parasite';
  }

  colour() {
    return 'rgb(0,0,0,0.4)';
  }

  set_target() {
    var behaviour = this;
    if (this.snakes().length == 0) {
      this.idle()
    } else {
      var parasite = this.snake;
      var distances = Game.snakes.map(function (snake) {
        if (snake == parasite) {
          return 99999;
        }
        var length = snake.tail_segments.length;
        return Utils.distanceBetweenPoints(parasite, snake) - (length * 1000);
      });
      var min_distance = Math.min(...distances);
      var target = this.snakes()[distances.indexOf(min_distance)];
      if (target == this.snake) {
        this.target = {x: (this.game_width() / 2), y: (this.game_height() / 2)}
      } else {
        this.snake.target = target;
      }
    }
  }

  every_tick() {
    this.set_target();
  }

};
