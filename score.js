function Score() {
  this.value = 0;

  this.increment = function () {
    this.value += 1;
    if (this.value % 10 == 0) {
      Canvas.health.increment();
    }
    var actions = ScriptActions.for_score(Canvas.score.value);
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
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.textAlign = "left";
    Canvas.ctx.fillStyle = 'rgba(0,0,0,1)';
    Canvas.ctx.fillText("Score: " + this.value, 20, 25);
  };
};