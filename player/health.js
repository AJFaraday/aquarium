if (typeof Player === 'undefined') {
  Player = {}
}

Player.Health = class {
  constructor () {
    this.value = 10;
  }

  increment() {
    this.value += 5;
  }

  decrement (damage) {
    this.value -= damage;
    if (this.value <= 0) {
      Game.end();
    }
  }

  draw() {
    Game.canvas.draw_text(
      "Health: " + this.value,
      20,
      55,
      'rgba(0,0,0,1)',
      'left',
      30
    );
  }
};