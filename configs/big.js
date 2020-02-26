if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.big = {
  id: 'big',
  type: 'all',
  name: 'Big Swarm Mode - All snakes',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 200, //initial feast
  grid_size: 100,
  food_interval: 5, // In ticks
  famine: false,
  starting_behaviours: Config.all_behaviours,
  snakes_of_each_behaviour: 10,
  respawn_behaviours: Config.all_behaviours,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
