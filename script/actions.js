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

  add_enemy: function(args) {
    console.log('yup')

    new Enemies[args.enemy_type](args.x, args.y, args);
  }
};