if (typeof Creatures === 'undefined') {
  Creatures = {}
}

Creatures.Snake = class Snake extends mix(Concerns.Follower, Concerns.TailBiter, Concerns.Eater) {
  constructor () {
    super();
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
    this.idling = false;
    this.grow_tail();
    this.grow_tail();

    Game.updatables.push(this);
    Game.drawables.push(this);
    Game.creatures.push(this);
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
    if(!Game.food.includes(this.target)) {
      this.set_target();
    }
    if (this.health <= 0) {
      console.log(Game.tick + ": snake removed because it's tail was bitten");
      this.remove();
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

  get_bitten() {
    this.speed = 20;
  }

  bite(creature) {
    this.last_ate_tick = Game.tick;
    this.speed += creature.speed / 10;
  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.creatures.splice(Game.creatures.indexOf(this), 1);
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
        console.log(Game.tick + ': snake died of starvation')
        this.remove();
      } else {
        this.last_ate_tick = Game.tick;
        this.tail_segments.pop();
      }
    }
  }

};