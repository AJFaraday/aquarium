class Game {

  static init(config) {

    if (typeof Math.seedrandom == 'function') {
      Math.seedrandom('aquarium', {global: true});
    } else {
      var seedrandom = require('seedrandom');
      seedrandom('aquarium', {global: true});
    }

    this.config = config;
    console.log('Running Config: ' + config.name);

    this.cli_mode = (typeof document === 'undefined');
    if (this.cli_mode) {
      this.width = 1024;
      this.height = 768;
    } else {
      if (localStorage.getItem('standard') == 'true') {
        this.width = 1024;
        this.height = 768;
      } else {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;
      }

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
    Game.ended = false;

    this.drawables.push(
      new Static.Text(
        this.config.name,
        20, 40, 30, 'left'
      )
    );

    switch (Game.config.starting_food_mode) {
      case 'rng':
        Game.add_random_foods(Game.config.starting_food);
        break;
      case 'grid':
        Game.add_food_grid(Game.config.grid_size);
    }

    Stats.clear();
    this.snake_registry = {};
    var starting_snakes_left = Game.config.min_starting_snakes;
    Game.config.starting_behaviours.forEach(
      function (behaviour) {
        [...Array(Game.config.snakes_of_each_behaviour)].forEach(
          function (_) {
            Game.add_snake(behaviour);
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
    if (Game.snakes.length < Game.config.min_snakes) {
      Game.add_random_snake();
    }
    if (Game.snakes.length == 0) {
      Game.game_over_message('Game over: No snakes remain')
      Game.end();
    } else {
      Game.snakes.forEach(
        function (snake) {
          snake.behaviour.every_tick();
        }
      )
    }
    if (Game.tick >= 30000) {
      Game.game_over_message('Game Over: 5 minute limit has been reached');
      Game.end();
    }
  }

  static game_over_message(text) {
    console.log(Game.tick + ': ' + text);
    Game.drawables.push(
      new Static.Text((text + '(' + Game.tick + ')'), (Game.width - 20), 40, 30, 'right')
    );
  }

  static draw() {
    Game.canvas.clear();
    Game.drawables.forEach(
      function (drawable) {
        drawable.draw();
      }
    );
    var stat_mode = localStorage.getItem('stat_mode');
    if (stat_mode == '1' || stat_mode == 1) {
      Stats.draw_summaries();
    } else if (stat_mode == '2' || stat_mode == 2) {
      Stats.draw_snakes();
    } else if (stat_mode == '3' || stat_mode == 3) {
      Stats.draw_game_stats()
    }
    }

    static
    add_random_snake()
    {
      var behaviour = Game.config.respawn_behaviours[Math.floor(Math.random() * Game.config.respawn_behaviours.length)];
      Game.add_snake(behaviour);
    }

    static
    add_random_foods(n)
    {

      [...Array(n)].forEach(
        function (_) {
          new Static.Food();
        }
      );
    }

    static
    add_food_grid(size)
    {
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

    static
    add_food()
    {
      if ((Game.tick - Game.last_food_tick) >= Game.config.food_interval) {
        Game.last_food_tick = Game.tick;
        new Static.Food();
      }
    }

    static
    add_snake(behaviour)
    {
      var snake = new Creatures.Snake(behaviour);
      return snake;
    }
    ;

    static
    end()
    {
      Game.ended = true;
      clearInterval(Game.draw_loop);
      clearInterval(Game.update_loop);
    }

    static
    register_snake(name)
    {
      if (typeof Game.snake_registry[name] == 'undefined') {
        Game.snake_registry[name] = 0;
      }
      Game.snake_registry[name]++;
      return name + '[' + Game.snake_registry[name] + ']'
    }

    static
    food_at(object)
    {
      return Game.food.some(function (f) {
        return (f.x == object.x && f.y == object.y)
      });
    }

    static
    snake_at(object)
    {
      return Game.snakes.some(function (s) {
        return (s.x == object.x && s.y == object.y)
      });
    }

  }