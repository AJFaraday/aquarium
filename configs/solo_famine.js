if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.solo_famine = {
  id: 'solo_famine',
  type: 'solo',
  name: function() {
    var dummy_behaviour = new(Config.current_behaviour()[0]);
    return "Famine Mode: " + dummy_behaviour.name();
  },
  title: 'Famine Mode',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 10, //initial feast
  grid_size: 100,
  food_interval: 50, // In ticks
  famine: true,
  famine_step: 30,
  starting_behaviours: Config.current_behaviour,
  snakes_of_each_behaviour: 1,
  respawn_behaviours: Config.all_behaviours,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
