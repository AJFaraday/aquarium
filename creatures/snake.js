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
    this.colour = 'rgba(0,256,128, 0.3)';

    this.turn_speed = 40; // up to 100
    this.speed = 20;
    this.angle = 0;
    this.tail_segments = [];
    this.history = [];

    Game.updatables.push(this);
    Game.drawables.push(this);
    Game.creatures.push(this);
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

  //////////////

  grow_tail() {
    var target = this.tail_segments[this.tail_segments.length - 1];
    if (target == null) {
      target = this;
    }
    this.tail_segments.push(new Creatures.TailSegment(target, this));
  }


};