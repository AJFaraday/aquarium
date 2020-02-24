if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.grid = {
  name: function() {
    var dummy_behaviour = new(Config.current_behaviour()[0]);
    return "Solo on grid: " + dummy_behaviour.name();
  },
  min_snakes: 0,
  starting_food_mode: 'grid', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 500, // In ticks
  famine: false,
  starting_behaviours: Config.current_behaviour,
  //starting_behaviours: [Behaviours.Random],
  snakes_of_each_behaviour: 1,
  respawn_behaviours: Config.current_behaviour,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
