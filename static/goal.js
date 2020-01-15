if (typeof Static === 'undefined') {
  Static = {}
}

Static.Goal = class Goal {
  constructor() {
    super.constructor()
    this.x = Math.floor(Math.random() * 1024);
    this.y = Math.floor(Math.random() * 768);
    this.size = 6;
    this.colour = 'rgba(0, 256, 256, 0.8)';

    var catchable = Object.assign({}, Concerns.Catchable);
    delete catchable.remove;
    Object.assign(this, catchable);
  }

  draw() {
    Game.canvas.draw_square(this);
  }

  update() {
    if (this.caught()) {
      this.remove();
      Player.score.increment();
      Game.add_goals();
      Game.add_obstacles();
      Player.head.increase_difficulty();
      Player.head.grow_tail();
    }
  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.goals.splice(Game.goals.indexOf(this), 1);
  }
};