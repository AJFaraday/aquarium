if (typeof Player === 'undefined') {
  Player = {}
}

Player.Score = function() {
  this.value = 0;

  this.increment = function () {
    this.value += 1;
    if (this.value % 10 == 0) {
      Player.health.increment();
    }
    var actions = ScriptActions.for_score(Player.score.value);
    if (actions) {
      actions.forEach(function (action) {
        if (action.type == 'oneshot') {
          ScriptActions[action.func](action)
        }
      });
    }
  };

  this.decrement = function () {
    this.value -= 5;
  };

  this.draw = function () {
    Canvas.draw_text(
      "Score: " + this.value,
      20,
      25,
      'rgba(0,0,0,1)',
      'left',
      30
    );
  };
};