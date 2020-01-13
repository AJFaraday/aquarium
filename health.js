function Health() {
  this.value = 10;

  this.increment = function () {
    this.value += 5;
  };

  this.decrement = function (damage) {
    this.value -= damage;
    if (this.value <= 0) {
      Canvas.stop();
    }
  };

  this.draw = function () {
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.textAlign = "left";
    Canvas.ctx.fillStyle = 'rgba(0,0,0,1)';
    Canvas.ctx.fillText("Health: " + this.value, 20, 55);
  };
};