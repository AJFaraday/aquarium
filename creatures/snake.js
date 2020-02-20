if (typeof Creatures === 'undefined') {
  Creatures = {}
}

Creatures.Snake = class Snake extends mix(Concerns.Follower, Concerns.TailBiter, Concerns.Eater) {
  constructor (behaviour) {
    super();

    Game.snake_index++;
    this.behaviour = new behaviour(this);
    this.colour = this.behaviour.colour();
    this.name = this.behaviour.name() + '[' + Game.snake_index + ']';

    this.target ={x: 0, y: 0};

    this.x = Math.random() * Game.width;
    this.y = Math.random() * Game.height;
    this.size = 40;

    this.turn_speed = 40; // up to 100
    this.speed = 20;
    this.angle = 0;
    this.tail_segments = [];
    this.history = [];
    this.health = 20;
    this.last_ate_tick = Game.tick;
    this.grow_tail();
    this.grow_tail();

    Game.updatables.push(this);
    Game.drawables.push(this);
    Game.snakes.push(this);
  }

  set_strategy(strategy) {
    if (Strategies[strategy]) {
      this.strategy = Strategies[strategy];
    } else {
      throw("Unknown strategy: " + strategy)
    }
  }

  update() {
    this.move();
    this.bite_tail();
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].move();
    }
    if (Game.food.length == 0) {
      this.behaviour.idle();
    } else if(!Game.food.includes(this.target) && !Game.snakes.includes(this.target)) {
      this.behaviour.target_removed();
    }
    this.check_for_starvation();
  }

  draw() {
    Game.canvas.draw_circle(this);
    for (var segment in this.tail_segments) {
      this.tail_segments[segment].draw();
    }
  }

  get_speed() {
    return this.speed;
  }

  get_bitten_by(biter) {
    this.speed = 20;
    if (this.health <= 0) {
      console.log(Game.tick + ": " + this.name + " died because it's tail was bitten by " + biter.name);
      this.remove();
    }
  }

  bite(snake) {
    this.last_ate_tick = Game.tick;
    this.speed += snake.speed / 10;
    this.behaviour.bite_tail(snake);
    snake.behaviour.tail_bitten(this);
  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.snakes.splice(Game.snakes.indexOf(this), 1);
  }

  //////////////

  grow_tail() {
    var target = this.tail_segments[this.tail_segments.length - 1];
    if (target == null) {
      target = this;
    }
    this.tail_segments.push(new Creatures.TailSegment(target, this));
  }

  check_for_starvation() {
    if ((Game.tick - this.last_ate_tick) > Config.starvation_interval) {
      if (this.tail_segments.length == 0) {
        console.log(Game.tick + ': ' + this.name + ' died of starvation');
        this.remove();
      } else {
        this.last_ate_tick = Game.tick;
        this.tail_segments.pop();
        this.behaviour.starve();
      }
    }
  }

};