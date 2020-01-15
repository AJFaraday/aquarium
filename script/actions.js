if (typeof Script === 'undefined') {
  Script = {}
}

Script.Actions = {
  for_score: function(score) {
    return Script.Steps[score];
  },

  show_help: function(args) {
    Game.canvas.draw_text(
      args.message,
      512,
      (650 + (args.index * 32)),
      '#000000',
      'center',
      30
    );
  },

  add_chaser: function(args) {
    var new_chaser = new Enemies.Chaser(args.x, args.y);
    Game.drawables.push(new_chaser);
    Game.updatables.push(new_chaser);
  }
};