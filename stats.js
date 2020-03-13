class Stats {

  static for_behaviour(behaviour_name) {
    if (typeof Stats.stats == 'undefined') {
      Stats.stats = {}
    }
    if (typeof Stats.stats[behaviour_name] == 'undefined') {
      Stats.stats[behaviour_name] = new Stats(behaviour_name);
    }
    return Stats.stats[behaviour_name]
  }

  static font_size() {
    return 20;
  }

  static draw() {
    if (Game.canvas) {
      var x = 50;
      var y = 80;
      var stats = Object.values(Stats.stats).sort((a, b) => (a.value < b.value) ? 1 : -1)
      stats.forEach(
        function (stat) {
          Game.canvas.draw_text(
            stat.behaviour_name,
            x, y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          Game.canvas.draw_text(
            stat.value,
            (x + 220), y, 'rgba(0,0,0,1)', 'left', Stats.font_size()
          );
          y += Stats.font_size();
        }
      )
    }
  }

  constructor(behaviour_name) {
    this.behaviour_name = behaviour_name;
    this.value = 0;
    // TODO fill these in accordingly
    this.total_snakes = 0;
    this.current_snakes = 0;
  }

  score_points(n) {
    this.value += n;
  }


}