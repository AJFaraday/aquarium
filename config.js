// The game runs at 100 ticks per second
Config = {
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 20, //initial feast
  grid_size: 100,
  food_interval: 5, // In ticks
  famine: false,
  starting_snakes: [
    {colour: 'rgb(255,0,0,0.4)', strategy: 'nearest', count: 10},
    {colour: 'rgb(0,255,0,0.4)', strategy: 'farthest', count: 10},
    {colour: 'rgb(0,0,255,0.4)', strategy: 'random', count: 10},
    {colour: 'rgb(128,128,128,0.4)', strategy: 'low_turning', count: 10},
    {colour: 'rgb(128,0,128,0.4)', strategy: 'high_turning', count: 10},
    {colour: 'rgb(255,128,0,0.4)', strategy: 'top_hugger', count: 10},
    {colour: 'rgb(0,0,0,0.4)', strategy: 'parasite', count: 10}
  ],
  // Make it higher to start with at least this many
  min_starting_snakes: 1,
  starvation_interval: 500 // In ticks
};
