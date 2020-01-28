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
    Script.Actions.run_with_type(Player.score.value, 'oneshot');
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