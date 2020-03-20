if (typeof Configs === 'undefined') {Configs = {}}

// The game runs at 100 ticks per second
Configs.swarm = {
  id: 'swarm',
  type: 'solo',
  name: function() {
    var dummy_behaviour = new(Config.current_behaviour()[0]);
    return "Swarm mode: 20 x " + dummy_behaviour.name();
  },
  title: 'Swarm mode: 20x snakes',
  min_snakes: 0,
  starting_food_mode: 'rng', // rng = normal, grid = 1 every 'grid_size' pixels
  starting_food: 200, //initial feast
  grid_size: 100,
  food_interval: 5, // In ticks
  famine: false,
  starting_behaviours: Config.current_behaviour,
  //starting_behaviours: [Behaviours.Random],
  snakes_of_each_behaviour: 20,
  respawn_behaviours: Config.current_behaviour,
  // Make it higher to start with at least this many
  min_starting_snakes: 0,
  starvation_interval: 500 // In ticks
};
