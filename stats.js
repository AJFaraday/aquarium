class Stats {

  static for_behaviour(behaviour) {
    if (typeof Stats.stats == 'undefined') {
      Stats.stats = {}
    }
    if (typeof Stats.stats[behaviour.name()] == 'undefined') {
      Stats.stats[behaviour.name()] = new Stats(behaviour);
    }
    return Stats.stats[behaviour.name()]
  }

  static clear() {
    Stats.stats = [];
  }

  static font_size() {
    return 20;
  }

  static draw_game_stats() {
    if (Game.canvas) {
      var y = 70;
      Game.canvas.draw_text(
        'Tick',
        50, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      Game.canvas.draw_text(
        Game.tick,
        200, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      y += Stats.font_size();
      Game.canvas.draw_text(
        'No. Snakes',
        50, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      var total_snakes = Object.values(Game.snake_registry).reduce((a,b) => a + b, 0)
      Game.canvas.draw_text(
        `${Game.snakes.length}/${total_snakes}`,
        200, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      y += Stats.font_size();
      Game.canvas.draw_text(
        'No. Food',
        50, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      var total_snakes = Object.values(Game.snake_registry).reduce((a,b) => a + b, 0)
      Game.canvas.draw_text(
        Game.food.length,
        200, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      y += Stats.font_size();
      Game.canvas.draw_text(
        'Food int.',
        50, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      var total_snakes = Object.values(Game.snake_registry).reduce((a,b) => a + b, 0)
      Game.canvas.draw_text(
        Game.config.food_interval,
        200, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
    }
  }

  static draw_summaries() {
    if (Game.canvas) {
      var x = 50;
      Game.canvas.draw_text(
        'Behaviour',
        x, 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      Game.canvas.draw_text(
        'Pts.',
        (x + 220), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      Game.canvas.draw_text(
        'Count',
        (x + 270), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      Game.canvas.draw_text(
        'Avg.',
        (x + 350), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );

      var y = 100;
      var stats = Object.values(Stats.stats).sort((a, b) => (a.average_score() < b.average_score()) ? 1 : -1);
      stats.forEach(
        function (stat) {
          Game.canvas.draw_square(
            {x: (x - 10), y: (y - 8), size: 10, colour: stat.colour}
          );
          Game.canvas.draw_text(
            stat.behaviour_name,
            x, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          Game.canvas.draw_text(
            stat.total_score,
            (x + 220), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          Game.canvas.draw_text(
            (stat.current_snakes + '/' + stat.total_snakes),
            (x + 270), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          Game.canvas.draw_text(
            stat.average_score(),
            (x + 350), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          y += Stats.font_size();
        }
      )
    }
  }

  static draw_snakes() {
    if (Game.canvas) {
      var x = 50;
      Game.canvas.draw_text(
        'Snake',
        x, 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
    }
    Game.canvas.draw_text(
      'Spd.',
      (x + 220), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
    );
    Game.canvas.draw_text(
      'Length',
      (x + 310), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
    );
    Game.canvas.draw_text(
      'HP',
      (x + 380), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
    );
    Game.canvas.draw_text(
      'Points.',
      (x + 430), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
    );

    var y = 100;
    var snakes = Game.snakes;
    snakes = snakes.concat(Stats.dead_snakes);
    snakes = snakes.sort((a, b) => (a.score() < b.score()) ? 1 : -1);
    snakes.forEach(
      function (snake) {
        var colour;
        if (snake.health > 0) {
          colour = 'rgba(0,0,0,1)';
        } else {
          colour = 'rgba(128,0,0,1)';
        }
        Game.canvas.draw_square(
          {x: (x - 10), y: (y - 8), size: 10, colour: snake.colour}
        );
        Game.canvas.draw_text(
          snake.name,
          x, y, colour, 'left', Stats.font_size()
        );
        Game.canvas.draw_text(
          snake.speed.toFixed(3),
          (x + 220), y, colour, 'left', Stats.font_size()
        );
        Game.canvas.draw_text(
          snake.tail_segments.length,
          (x + 310), y, colour, 'left', Stats.font_size()
        );
        Game.canvas.draw_text(
          snake.health,
          (x + 380), y, colour, 'left', Stats.font_size()
        );
        Game.canvas.draw_text(
          snake.stats.scores[snake.name],
          (x + 430), y, colour, 'left', Stats.font_size()
        );
        y += Stats.font_size();
      }
    )
  }

  average_score() {
    if (typeof this.cached_avg_tick == 'undefined' || this.cached_avg_tick < Game.tick) {
      this.cached_avg_tick = Game.tick;
      this.cached_avg = this.total_score / Object.values(this.scores).length;
    }
    return this.cached_avg;
  }

  constructor(behaviour) {
    Stats.dead_snakes = [];
    this.behaviour_name = behaviour.name();
    this.behaviour_key = behaviour.constructor.name;
    this.total_score = 0;
    this.total_snakes = 0;
    this.current_snakes = 0;
    this.scores = {};
  }

  score_points(n, snake) {
    this.total_score += n;
    this.scores[snake.name] += 1;
  }

  add_snake(snake) {
    this.total_snakes += 1;
    this.current_snakes += 1;
    this.scores[snake.name] = 0;
    this.colour = snake.colour;
  }

  remove_snake(snake) {
    Stats.dead_snakes.push(snake);
    this.current_snakes -= 1;
  }

}