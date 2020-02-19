class Game {

  static init() {
    this.cli_mode = (typeof document === 'undefined');
    if (this.cli_mode) {
      this.width = 1024;
      this.height = 768;
    } else {
      this.width = document.documentElement.clientWidth;
      this.height = document.documentElement.clientHeight;
      this.canvas = new Canvas();
      this.canvas.canvas.width = this.width;
      this.canvas.canvas.height = this.height;
    }

    this.tick = 0;

    Game.drawables = [];
    Game.updatables = [];

    Game.last_food_tick = 0;
    Game.food = [];
    Game.snakes = [];

    switch (Config.starting_food_mode) {
      case 'rng':
        Game.add_random_foods(Config.starting_food);
        break;
      case 'grid':
        Game.add_food_grid(Config.grid_size);
    }

    var starting_snakes_left = Config.min_starting_snakes;
    Config.starting_snakes.forEach(
      function (config) {
        [...Array(config.count)].forEach(
          function (_) {
            Game.add_snake('Snake', config.colour, config.strategy);
            starting_snakes_left--;
          }
        );
      }
    );
    if (starting_snakes_left > 0) {
      [...Array(starting_snakes_left)].forEach(
        function (_) {
          Game.add_random_snake();
        }
      );
    }

    if (!this.cli_mode) {
      Game.draw_loop = setInterval(
        function () {
          requestAnimationFrame(Game.draw)
        },
        10
      );
      Game.update_loop = setInterval(Game.update, 10);
    }
  }

  static update() {
    Game.updatables.forEach(
      function (updatable) {
        updatable.update();
      }
    );
    Game.add_food();
    Game.tick++;
    if (Game.snakes.length < Config.min_snakes) {
      Game.add_random_snake();
    }
    if (Game.snakes.length == 0) {
      Game.end();
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

  static add_random_snake() {
    var config = Config.starting_snakes[Math.floor(Math.random() * Config.starting_snakes.length)];
    Game.add_snake(
      'Snake',
      config.colour,
      config.strategy
    );
  }

  static add_random_foods(n) {
    [...Array(n)].forEach(
      function (_) {
        Game.add_food();
      }
    );
  }

  static add_food_grid(size) {
    var grid_width = Math.floor(Game.width / size);
    var grid_height = Math.floor(Game.height / size);
    var row = 0;
    var col = 0;
    while (row <= grid_height) {
      col = 0;
      while (col <= grid_width) {
        var food = new Static.Food();
        food.x = col * size;
        food.y = row * size;
        col++;
      }
      row++;
    }
  }

  static add_food() {
    if ((Game.tick - Game.last_food_tick) >= Config.food_interval) {
      Game.last_food_tick = Game.tick;
      new Static.Food();
    }
  }

  static add_snake(type, colour, strategy) {
    var snake = new Creatures.Snake;
    snake.colour = colour;
    snake.set_strategy(strategy);
    return snake;
  };

  static end() {
    clearInterval(Game.draw_loop);
    clearInterval(Game.update_loop);
  }

}