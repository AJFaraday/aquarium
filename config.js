// The game runs at 100 ticks per second
Config = {

  index: 0,
  opponent_index: 0,

  all_behaviours: function () {
    return Object.values(Behaviours);
  },

  single_behaviour: function (index) {
    return [Object.values(Behaviours)[index]];
  },

  current_behaviour: function () {
    return Config.single_behaviour(Config.index);
  },

  current_opponent: function () {
    return Config.single_behaviour(Config.opponent_index);
  },

  current_pair: function () {
    return Config.current_behaviour().concat(Config.current_opponent());
  },

  next_behaviour: function () {
    var current = Config.current_behaviour();
    Config.index++;
    return current;
  },

  next_opponent: function () {
    var current = Config.current_opponent();
    Config.opponent_index++;
    return current;
  },

  finished: function () {
    return Config.index >= (Object.keys(Behaviours).length);
  },

  reset_indexes: function () {
    Config.index = 0;
    Config.opponent_index = 0;
  },

  build_config: function (config) {
    var new_config = {};
    Object.keys(config).forEach(
      function (key) {
        if (typeof config[key] == 'function') {
          new_config[key] = config[key]();
        } else {
          new_config[key] = config[key];
        }
      }
    );
    return new_config;
  },

  build_config_for_all: function (config) {
    Config.reset_indexes();
    configs = [];
    while (!Config.finished()) {
      configs.push(Config.build_config(config));
      Config.next_behaviour();
    }
    return configs;
  },

  build_config_for_all_pairs: function (config) {
    Config.reset_indexes();
    configs = [];
    while (!Config.finished()) {
      Config.opponent_index = Config.index;
      while (Config.opponent_index < (Object.keys(Behaviours).length)) {
        configs.push(Config.build_config(config));
        Config.next_opponent();
      }
      Config.next_behaviour();
    }
    return configs;
  }

};
