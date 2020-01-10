ScriptActions = {
  for_score: function(score) {
    return Script[score];
  },

  show_help: function(args) {
    Canvas.ctx.font = ("30px Arial");
    Canvas.ctx.textAlign = "center";
    Canvas.ctx.fillText(args.message, 512, (650 + (args.index * 32)));
  },

  oneshot_test: function(args) {
    console.log('doing one shot action');
  }
};