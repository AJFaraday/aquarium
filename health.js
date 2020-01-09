function Health() {
  this.value = 10;

  this.increment = function () {
    this.value += 5;
  };

  this.decrement = function () {
    this.value -= 1;
    if (this.value <= 0) {
      Canvas.stop();
    }
  };

  this.draw = function () {
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.fillText("Health: " + this.value, 20, 55);
  };
};