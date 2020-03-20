if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.duel = {
  id: 'duel',
  type: 'versus',
  name: function() {
    var dummy_behaviour = new(Config.current_behaviour()[0]);
    var dummy_opponent = new(Config.current_opponent()[0]);
    return "Duel: " + dummy_behaviour.name() + '  Vs. ' + dummy_opponent.name();
  },
  title: 'Duel',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 50, // In ticks
  famine: false,
  starting_behaviours: Config.current_pair,
  snakes_of_each_behaviour: 1,
  respawn_behaviours: Config.current_pair,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
