class Score {

  static for_behaviour(behaviour_name) {
    if (typeof Score.scores == 'undefined') {
      Score.scores = {}
    }
    if (typeof Score.scores[behaviour_name] == 'undefined') {
      Score.scores[behaviour_name] = new Score(behaviour_name);
    }
    return Score.scores[behaviour_name]
  }

  static font_size() {
    return 20;
  }

  static draw() {
    if (Game.canvas) {
      var x = 50;
      var y = 80;
      var scores = Object.values(Score.scores).sort((a, b) => (a.value < b.value) ? 1 : -1)
      scores.forEach(
        function (score) {
          Game.canvas.draw_text(
            score.behaviour_name,
            x, y, 'rgba(0,0,0,1)', 'left', Score.font_size()
          );
          Game.canvas.draw_text(
            score.value,
            (x + 220), y, 'rgba(0,0,0,1)', 'left', Score.font_size()
          );
          y += Score.font_size();
        }
      )
    }
  }

  constructor(behaviour_name) {
    this.behaviour_name = behaviour_name;
    this.value = 0;
  }

  increment(n) {
    this.value += n;
  }


}