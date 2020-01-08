function Score() {
  this.value = 0;

  this.increment = function () {
    this.value += 1;
    if (this.value % 10 == 0) {
      Canvas.health.increment();
    }
  };

  this.decrement = function () {
    this.value -= 5;
  };

  this.draw = function () {
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.fillText("Score: " + this.value, 20, 25);
  };
};