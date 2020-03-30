if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.one_vs_five = {
  id: 'one_vs_five',
  type: 'versus',
  name: function() {
    var dummy_behaviour = new(Config.current_behaviour()[0]);
    var dummy_opponent = new(Config.current_opponent()[0]);
    return "1 " + dummy_behaviour.name() + ' Vs. 5 x ' + dummy_opponent.name();
  },
  title: 'One Vs. Five',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 50, // In ticks
  famine: false,
  starting_behaviours: function() {
    var pair = Config.current_pair();
    return [
      pair[0],
      pair[1], pair[1],
      pair[1], pair[1], pair[1]
    ];
  },
  snakes_of_each_behaviour: 1,
  respawn_behaviours: Config.current_pair,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
