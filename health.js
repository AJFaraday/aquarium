function Health() {
  this.value = 10;

  this.increment = function () {
    this.value += 5;
  };

  this.decrement = function (damage) {
    this.value -= damage;
    if (this.value <= 0) {
      Game.end();
    }
  };

  this.draw = function () {
    Canvas.draw_text(
      "Health: " + this.value,
      20,
      55,
      'rgba(0,0,0,1)',
      'left',
      30
    );
  };
};