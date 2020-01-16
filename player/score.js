if (typeof Player === 'undefined') {
  Player = {}
}

Player.Score = class {
  constructor(){
    this.value = 0;
  }

  increment() {
    this.value += 1;
    if (this.value % 10 == 0) {
      Player.health.increment();
    }
    var actions = Script.Actions.for_score(Player.score.value);
    if (actions) {
      actions.forEach(function (action) {
        if (action.type == 'oneshot') {
          Script.Actions[action.func](action)
        }
      });
    }
  };

  draw() {
    Game.canvas.draw_text(
      "Score: " + this.value,
      20,
      25,
      'rgba(0,0,0,1)',
      'left',
      30
    );
  };
};