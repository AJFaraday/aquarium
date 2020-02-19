if (typeof Static === 'undefined') {
  Static = {}
}

Static.Food = class Food extends Concerns.Catchable {
  constructor() {
    super();
    this.x = Math.floor(Math.random() * Game.width);
    this.y = Math.floor(Math.random() * Game.height);
    this.size = 6;
    this.colour = 'rgba(0, 256, 256, 0.8)';
    Game.drawables.push(this);
    Game.updatables.push(this);
    Game.food.push(this);

    Game.creatures.forEach(
      function(creature) {
        creature.see_new_food();
      }
    )
  }

  draw() {
    Game.canvas.draw_square(this);
  }

  update() {
    if (this.caught()) {
      this.remove();
      this.caught_by().eat();
    }
  }

  remove() {
    Game.updatables.splice(Game.updatables.indexOf(this), 1);
    Game.drawables.splice(Game.drawables.indexOf(this), 1);
    Game.food.splice(Game.food.indexOf(this), 1);
    if(Config.famine == true) {
      Config.food_interval += 10;
    }
  }
};