ScriptActions = {
  for_score: function(score) {
    return Script[score];
  },

  show_help: function(args) {
    Canvas.draw_text(
      args.message,
      512,
      (650 + (args.index * 32)),
      '#000000',
      'center',
      30
    );
  },

  add_chaser: function(args) {
    var new_chaser = new Chaser(args.x, args.y);
    Game.drawables.push(new_chaser);
    Game.checkables.push(new_chaser);
  }
};