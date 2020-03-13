class Stats {

  static for_behaviour(behaviour_name) {
    if(typeof Stats.stats == 'undefined') {
      Stats.stats = {}
    }
    if(typeof Stats.stats[behaviour_name] == 'undefined') {
      Stats.stats[behaviour_name] = new Stats(behaviour_name);
    }
    return Stats.stats[behaviour_name]
  }

  static font_size() {
    return 20;
  }

  static draw() {
    if(Game.canvas) {
      var x = 50;

      Game.canvas.draw_text(
        'Behaviour',
        x, 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      Game.canvas.draw_text(
        'Pts.',
        (x + 220), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
      );
      if (Object.values(Stats.stats).some(function(s){return s.total_snakes > 1})) {
        Game.canvas.draw_text(
          'Count',
          (x + 270), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
        );
        Game.canvas.draw_text(
          'Avg.',
          (x + 350), 70, 'rgba(0,0,0,1)', 'left', Stats.font_size()
        );
      }


      var y = 100;
      var stats = Object.values(Stats.stats).sort((a, b) => (a.average_score() < b.average_score()) ? 1 : -1);
      stats.forEach(
        function(stat) {
          Game.canvas.draw_text(
            stat.behaviour_name,
            x, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          Game.canvas.draw_text(
            stat.total_score,
            (x + 220), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          if(stat.total_snakes > 1) {
            Game.canvas.draw_text(
              (stat.current_snakes + '/' + stat.total_snakes),
              (x + 270), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
            );
            Game.canvas.draw_text(
              stat.average_score(),
              (x + 350), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
            );
          }
          y += Stats.font_size();
        }
      )
    }
  }

  average_score() {
    return Object.values(this.scores)
        .reduce(
          function(a, b) {
            return a + b;
          }
        ) / Object.values(this.scores).length
  }

  constructor(behaviour_name) {
    this.behaviour_name = behaviour_name;
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
  }

  remove_snake(snake) {
    this.current_snakes -= 1;
  }

}