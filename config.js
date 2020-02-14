// The game runs at 100 ticks per second
Config = {
  min_snakes: 0,
  starting_food: 20, //initial feast
  food_interval: 100, // In ticks
  starting_snakes: [
    {colour: 'rgb(255,0,0,0.4)', strategy: 'nearest', count: 2},
    {colour: 'rgb(0,255,0,0.4)', strategy: 'farthest', count: 2},
    {colour: 'rgb(0,0,255,0.4)', strategy: 'random', count: 2},
    {colour: 'rgb(128,128,128,0.4)', strategy: 'low_turning', count: 2},
    {colour: 'rgb(128,0,128,0.4)', strategy: 'high_turning', count: 2},
    {colour: 'rgb(255,128,0,0.4)', strategy: 'top_hugger', count: 2},
    {colour: 'rgb(0,0,0,0.4)', strategy: 'parasite', count: 2}
  ],
  // Make it higher to start with at least this many
  min_starting_snakes: 1,
  starvation_interval: 500 // In ticks
};
