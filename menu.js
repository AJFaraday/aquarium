class Menu {

  constructor() {
    this.list = document.querySelector('ul#menu');
    this.sections = [];
  }

  populate() {
    var menu = this;
    this.build_all_snake_items(menu);
    this.build_solo_items(menu);
    this.build_versus_items(menu);
  }

  build_versus_items(menu) {
    Menu.versus_configs().forEach(
      function (config_name) {
        var configs = Config.build_config_for_all_pairs(Configs[config_name]);
        configs.forEach(
          function (config, index) {
            menu.append_to_section('Versus', config);
          }
        )
      }
    )
  }

  build_solo_items(menu) {
    Menu.solo_configs().forEach(
      function (config_name) {
        var configs = Config.build_config_for_all(Configs[config_name]);
        configs.forEach(
          function (config, index) {
            menu.append_to_section('Solo', config);
          }
        )
      }
    )
  }

  build_all_snake_items(menu) {
    Menu.all_snake_configs().forEach(
      function (config_name) {
        var config = Config.build_config(Configs[config_name]);
        menu.append_to_section('All Snakes', config);
      }
    );
  }

  build_section(name) {
    var title = document.createElement('li');
    title.innerHTML = name;
    this.sections[name] = document.createElement('ul');
    this.list.append(title);
    this.list.append(this.sections[name]);
  }

  append_to_section(section, config) {
    if (typeof this.sections[section] == 'undefined') {
      this.build_section(section)
    }
    var label = config.name;
    var list_item = document.createElement('li');
    var link = document.createElement('a');
    link.innerHTML = label;
    link.setAttribute('href', this.url_from_config(config));
    link.setAttribute('target', '_blank');
    list_item.append(link);
    this.sections[section].append(list_item);
  }

  // TODO just config, one day
  url_from_config(config) {
    switch (config.type) {
      case 'solo':
        return 'dev_config.html?config=' + config.id +
          '&snake=' + config.starting_behaviours[0].name;
        break;
      case 'versus':
        return 'dev_config.html?config=' + config.id +
          '&snake=' + config.starting_behaviours[0].name +
          '&opponent=' + config.starting_behaviours[1].name;
        break;
      case 'all':
        return 'dev_config.html?config=' + config.id;
        break;
    }
  }

  static solo_configs() {
    return [
      'grid',
      'swarm'
    ]
  }

  static all_snake_configs() {
    return [
      'royale',
      'big'
    ]
  }

  static versus_configs() {
    return [
      'versus'
    ]
  }

}