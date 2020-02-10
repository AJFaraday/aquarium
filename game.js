class Game {

  static init() {
    //this.width = Game.width;
    //this.height = Game.height;
    this.width = document.documentElement.clientWidth;
    this.height = document.documentElement.clientHeight;

    this.canvas = new Canvas();
    this.canvas.canvas.width = this.width;
    this.canvas.canvas.height = this.height;
    this.tick = 0;

    Game.drawables = [];
    Game.updatables = [];

    Game.food = [];
    Game.creatures = [];


    [...Array(Config.starting_food)].forEach(
      function (_) {
        Game.add_food();
      }
    );
    var starting_snakes_left = Config.min_starting_snakes;
    Config.starting_snakes.forEach(
      function (config) {
        [...Array(config.count)].forEach(
          function (_) {
            Game.add_creature('Snake', config.colour, config.strategy);
            starting_snakes_left--;
          }
        );
      }
    );
    if (starting_snakes_left > 0) {
      [...Array(starting_snakes_left)].forEach(
        function (_) {
          Game.add_random_creature();
        }
      );
    }

    Game.draw_loop = setInterval(
      function () {
        requestAnimationFrame(Game.draw)
      },
      10
    );
    Game.update_loop = setInterval(Game.update, 10);

  }

  static update() {
    Game.updatables.forEach(
      function (updatable) {
        updatable.update();
      }
    );
    Game.add_food();
    Game.tick++;
    if (Game.creatures.length < Config.min_snakes) {
      Game.add_random_creature();
    }
  }

  static draw() {
    Game.canvas.clear();
    Game.drawables.forEach(
      function (drawable) {
        drawable.draw();
      }
    );
  }

  static add_random_creature() {
    var config = Config.starting_snakes[Math.floor(Math.random() * Config.starting_snakes.length)];
    Game.add_creature(
      'Snake',
      config.colour,
      config.strategy
    );
  }

  static add_food() {
    if ((Game.tick % Config.food_interval) == 0) {
      new Static.Food();
    }
  }

  static add_poison() {
    if (Game.goals.length == 1) {
      var no_to_add = Math.floor(Player.score.value / 10);
      for (var x = no_to_add; x > 0; x--) {
        new Static.Poison();
      }
    }
  }

  static add_creature(type, colour, strategy) {
    var creature = new Creatures[type];
    creature.colour = colour;
    creature.set_strategy(strategy);
    /*
    var r = Math.floor(Math.random() * 192) + 64;
    var g = Math.floor(Math.random() * 192) + 64;
    var b = Math.floor(Math.random() * 192) + 64;
    creature.colour = 'rgba('+r+','+g+','+b+',0.6)';
     */
    return creature;
  };

  static do_script_actions() {
    Script.Actions.run_without_type(Player.score.value);
  }

  static end() {
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);
  }

}