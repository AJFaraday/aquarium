if (typeof Creatures === 'undefined') {
  Creatures = {}
}

Creatures.Teleporter = class Teleporter extends mix(Concerns.Catchable, Concerns.TailBiter, Concerns.LifeSpan) {
  constructor(x, y, args) {
    super();
    this.jump_size = 200;
    this.teleport_interval = 100;
    this.teleport_warning = 50;
    this.target = Player.head;

    this.x = x;
    this.y = y;
    this.size = 20;
    this.colour = 'rgba(255,0,0,0.6)';
    this.angle = Utils.angleBetweenPoints(this, Player.head);
    this.life_span = 1000;

    this.history = [];
    Game.updatables.push(this);
    Game.drawables.push(this);
    Game.creatures.push(this);
    this.move_target = {
      x: 0, y:0,
      colour: 'rgba(255,0,0,0.6)', size: 5
    };
    this.teleport_end = Game.tick;
    this.target_set = false;
    this.birth_tick = Game.tick;
  }

  update() {
    this.bite_tail();
    if (this.caught()) {
      Player.health.decrement(5);
      this.remove();
    }
    if (this.warn_teleport() && !this.target_set) {
      this.set_target();
      this.target_set = true;
    }
    if (this.teleporting()) {
      this.x = this.move_target.x;
      this.y = this.move_target.y;
      this.teleport_end = Game.tick;
      this.target_set = false;
    }
    this.check_lifespan();
  };


  draw() {
    Game.canvas.draw_circle(this);
    if(this.warn_teleport()) {
      Game.canvas.draw_line(this, this.move_target, 'rgba(255, 0, 0 , 1)', 2);
      Game.canvas.draw_circle(this.move_target);
    }
  };

  warn_teleport() {
    return (Game.tick >= (this.teleport_end + this.teleport_interval));
  }


  teleporting() {
    return (Game.tick >= (this.teleport_end + this.teleport_interval + this.teleport_warning));
  };

  set_target() {
    this.get_angle();
    var jump_size = this.jump_size;
    var distance = Utils.distanceBetweenPoints(this, this.target);
    if (jump_size > distance) {
      jump_size = distance;
    }
    this.move_target.x = Math.cos(this.angle * Math.PI / 180) * (jump_size) + this.x;
    this.move_target.y = Math.sin(this.angle * Math.PI / 180) * (jump_size) + this.y;
  }

  get_angle() {
    this.angle -= Utils.angleDifference(this.angle_to_target(), this.angle);
  }

  angle_to_target() {
    return Utils.angleBetweenPoints(this, this.target);
  }

};
