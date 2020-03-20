if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.royale = {
  id: 'royale',
  type: 'all',
  name: 'Battle Royale - All snakes',
  title: 'Battle Royale - All snakes',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 50, // In ticks
  famine: false,
  starting_behaviours: Config.all_behaviours,
  snakes_of_each_behaviour: 1,
  respawn_behaviours: Config.all_behaviours,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
