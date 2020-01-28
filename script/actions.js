if (typeof Script === 'undefined') {
  Script = {}
}

Script.Actions = {
  for_score: function (score) {
    return Script.Steps[score];
  },

  run_without_type: function (score) {
    var actions = Script.Actions.for_score(score);
    if (actions) {
      actions.forEach(function (action) {
        if (!action.type) {
          Script.Actions.run_action(action);
        }
      });
    }
  },

  run_with_type: function (score, type) {
    var actions = Script.Actions.for_score(score);
    if (actions) {
      actions.forEach(function (action) {
        if (action.type == type) {
          Script.Actions.run_action(action);
        }
      });
    }
  },

  run_action: function (attrs) {
    Script.Actions[attrs.func](attrs)
  },

  show_help: function (args) {
    Game.canvas.draw_text(
      args.message,
      512,
      (650 + (args.index * 32)),
      '#000000',
      'center',
      30
    );
  },

  add_enemy: function (args) {
    new Enemies[args.enemy_type](args.x, args.y, args);
  }
};