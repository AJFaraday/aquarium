function Score() {
  this.value = 0;

  this.increment = function () {
    this.value += 1;
  };

  this.draw = function () {
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.fillText("Score: " + this.value, 20, 20)
  };
};