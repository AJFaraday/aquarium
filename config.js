// The game runs at 100 ticks per second
Config = {

  index: 0,

  all_behaviours: function() {
    return Object.values(Behaviours);
  },

  single_behaviour: function(index) {
    return [Object.values(Behaviours)[index]];
  },

  current_behaviour: function() {
    return Config.single_behaviour(Config.index);
  },

  next_behaviour: function() {
    var current =  Config.current_behaviour();
    Config.index++;
    return current;
  },

  finished: function() {
    return Config.index >= (Object.keys(Behaviours).length);
  },

  reset_index: function() {
    Config.index = 0;
  },
  
  build_config: function(config) {
    var new_config = {};
    Object.keys(config).forEach(
      function(key) {
        if(typeof config[key] =='function') {
          new_config[key] = config[key]();
        } else {
          new_config[key] = config[key];
        }
      }
    );
    return new_config;
  },

  build_config_for_all: function(config) {
    Config.reset_index();
    configs = [];
    while(!Config.finished()) {
      configs.push(Config.build_config(config));
      Config.next_behaviour();
    }
    return configs;
  }

};
