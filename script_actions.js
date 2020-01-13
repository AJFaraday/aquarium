ScriptActions = {
  for_score: function(score) {
    return Script[score];
  },

  show_help: function(args) {
    Canvas.ctx.font = "30px Arial";
    Canvas.ctx.fillStyle = "#000000";
    Canvas.ctx.textAlign = "center";
    Canvas.ctx.fillText(args.message, 512, (650 + (args.index * 32)));
  },

  add_chaser: function(args) {
    var new_chaser = new Chaser(args.x, args.y);
    Canvas.drawables.push(new_chaser);
    Canvas.checkables.push(new_chaser);
  }
};