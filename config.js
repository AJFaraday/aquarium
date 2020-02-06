Config = {
  min_snakes: 1,
  // In 100ths of a second
  food_interval: 50,
  starting_snakes: [
    {colour: 'rgb(255,0,0,0.4)', strategy: 'nearest'},
    {colour: 'rgb(0,255,0,0.4)', strategy: 'farthest'},
    {colour: 'rgb(0,0,255,0.4)', strategy: 'random'},
    {colour: 'rgb(128,128,128,0.4)', strategy: 'low_turning'},
    {colour: 'rgb(255,128,0,0.4)', strategy: 'top_hugger'},
    {colour: 'rgb(0,0,0,0.4)', strategy: 'parasite'}
  ]
};