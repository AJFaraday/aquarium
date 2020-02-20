// The game runs at 100 ticks per second
Config = {
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 500, // In ticks
  famine: false,
  starting_behaviours: Object.values(Behaviours),
  snakes_of_each_behaviour: 2,
  respawn_behaviours: Object.values(Behaviours),
  // Make it higher to start with at least this many
  min_starting_snakes: 10,
  starvation_interval: 500 // In ticks
};
