class Menu {

  constructor() {
    this.form = document.querySelector('div#form');
    this.menu = document.querySelector('div#menu');
    this.sections = [];
    this.get_title_width();
    this.populate();
    this.build_form();
  }

  get_title_width() {
    var names = Object.keys(Behaviours);
    names = names.concat(
      Menu.solo_configs().map(
        function(config_name) {
          return Configs[config_name].title;
        }
      )
    );
    var name_chars = Math.max(
      ...names.map(
        function(x) {
          return x.length;
        }
      )
    );
    this.title_width = (name_chars * 8) + 5;
  }

  populate() {
    var menu = this;
    this.build_all_snake_items(menu);
    this.build_solo_items(menu);
    this.build_versus_items(menu);
  }

  build_form() {
    var menu = this;

    var title = document.createElement('h2');
    title.innerHTML = 'Settings';
    this.form.appendChild(title);

    var label = document.createElement('label');
    label.innerHTML = 'Snake';
    this.form.appendChild(label);

    menu.snake_select = document.createElement('select');
    menu.snake_select.setAttribute('id', 'snake_select')
    menu.snake_select.addEventListener('change', function(e) {
      localStorage.setItem('snake', this.selectedOptions[0].value);
      menu.show_snake(this.selectedOptions[0].value);
    });

    var option = document.createElement('option');
    option.innerHTML = 'All';
    option.value = 'all';
    menu.snake_select.appendChild(option);
    Object.keys(Behaviours).forEach(
      function(behaviour) {
        var option = document.createElement('option');
        option.innerHTML = new Behaviours[behaviour](0).name();
        option.value = behaviour;
        menu.snake_select.appendChild(option);
        menu.form.appendChild(menu.snake_select);
      }
    );
    this.form.appendChild(menu.snake_select);

    if(localStorage.getItem('snake')) {
      var selected_index = Object.keys(Behaviours).indexOf(localStorage.getItem('snake'));
      if(selected_index == -1) {
        menu.snake_select.selectedIndex = 0;
      } else {
        menu.snake_select.selectedIndex = selected_index + 1;
      }
      menu.show_snake(menu.snake_select.selectedOptions[0].value);
    }

    this.form.appendChild(document.createElement('br'));
    var label = document.createElement('label');
    label.innerHTML = 'Standard';
    this.form.appendChild(label);

    this.standard_check = document.createElement('input');
    this.standard_check.setAttribute('type', 'checkbox');
    this.standard_check.checked = (localStorage.getItem('standard') == 'true');
    menu.standard_check.addEventListener('change', function(e) {
      localStorage.setItem('standard', this.checked);
    });
    this.form.appendChild(this.standard_check);


    this.form.appendChild(document.createElement('br'));
    var label = document.createElement('label');
    label.innerHTML = 'Stats';
    this.form.appendChild(label);

    menu.stat_select = document.createElement('select');
    menu.stat_select.addEventListener('change', function(e) {
      localStorage.setItem('stat_mode', this.selectedOptions[0].value);
    });
    ['None', 'Summary', 'Snakes'].forEach(
      function(name, index) {
        var option = document.createElement('option');
        option.innerHTML = name;
        option.value = index;
        menu.stat_select.appendChild(option);
      }
    );
    menu.stat_select.selectedIndex = localStorage.getItem('stat_mode');
    this.form.appendChild(menu.stat_select);
  }

  build_versus_items(menu) {
    Menu.versus_configs().forEach(
      function(config) {
        var configs = Config.build_config_for_all_pairs(Configs[config]);
        var title = menu.build_element('h1', {});
        title.innerHTML = Configs[config].title;
        menu.menu.appendChild(title);

        var grid = new VsMatchGrid(configs, Object.keys(Behaviours).length, menu);
        menu.menu.appendChild(grid.svg);
      }
    )
  }

  build_element(tag, attrs) {
    var element = document.createElement(tag);
    Object.keys(attrs).forEach(
      function(key) {
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

  build_solo_items(menu) {
    var title = menu.build_element('h1', {});
    title.innerHTML = 'Solo';
    menu.menu.appendChild(title);
    var grid_configs = {};
    Menu.solo_configs().forEach(
      function(config_name) {
        grid_configs[config_name] = Config.build_config_for_all(Configs[config_name]);
      }
    );
    var grid = new SoloMatchGrid(grid_configs, Object.keys(Behaviours).length, menu);
    menu.menu.appendChild(grid.svg);
  }

  build_all_snake_items(menu) {
    Menu.all_snake_configs().forEach(
      function(config_name) {
        var config = Config.build_config(Configs[config_name]);
        var big_flag = new AllSnakeFlag(config, menu.title_width, menu);
        menu.menu.appendChild(big_flag.title());
        menu.menu.appendChild(big_flag.svg);
      }
    );
  }

  url_from_config(config) {
    switch(config.type) {
      case 'solo':
        return 'config.html?config=' + config.id +
          '&snake=' + config.starting_behaviours[0].name;
        break;
      case 'versus':
        return 'config.html?config=' + config.id +
          '&snake=' + config.starting_behaviours[0].name +
          '&opponent=' + config.starting_behaviours[1].name;
        break;
      case 'all':
        return 'config.html?config=' + config.id;
        break;
    }
  }

  set_flag_alpha(selector, alpha) {
    document.querySelectorAll(selector).forEach(
      function(stop) {
        stop.setAttribute(
          'stop-color',
          Utils.change_alpha(stop.attributes['stop-color'].value, alpha)
        );
        /*
         stop.parentNode.childNodes.forEach(
         function(stop) {
         if(stop.attributes['stop-color']) {
         stop.setAttribute(
         'stop-color',
         Utils.change_alpha(stop.attributes['stop-color'].value, alpha)
         );
         }
         }
         );
         */
      }
    );
  }

  set_rect_alpha(selector, alpha) {
    document.querySelectorAll(selector).forEach(
      function(stop) {
        if(stop.attributes['fill']) {
          stop.setAttribute(
            'fill',
            Utils.change_alpha(stop.attributes['fill'].value, alpha)
          );
        }
      }
    );
  }

  show_all() {
    document.querySelectorAll('a[data-behaviour=match_link]').forEach(
      function(link) {
        link.parentElement.style.display = 'block';
      }
    );
    document.querySelectorAll(`svg a`).forEach(
      function(link) {
        link.removeAttribute('data-disabled')
      }
    );
    this.set_flag_alpha('stop', 0.6);
    this.set_rect_alpha('rect[class^=s]', 0.6);
  }

  hide_all() {
    document.querySelectorAll('a[data-behaviour=match_link]').forEach(
      function(link) {
        link.parentElement.style.display = 'none';
      }
    );
    // TODO Disable all flag links
    document.querySelectorAll('svg a').forEach(
      function(link) {
        link.setAttribute('data-disabled', 'true')
      }
    );
    this.set_flag_alpha('stop', 0.2);
    this.set_rect_alpha('rect[class^=s]', 0.2);
  }

  with_snake(name) {
    return document.querySelectorAll('[data-snakes*="' + name + '"]');
  }

  show_snake(name) {
    if(this.current_snake == name) {
      this.current_snake = 'all';
      this.snake_select.value = 'all';
      localStorage.setItem('snake', 'All');
      this.show_all();
    } else {
      this.hide_all();
      if(Object.keys(Behaviours).includes(name)) {
        this.current_snake = name;
        this.with_snake(name).forEach(
          function(link) {
            link.parentElement.style.display = 'block';
          }
        );
        var index = Object.keys(Behaviours).indexOf(name);
        document.querySelectorAll(`svg a.s${index}`).forEach(
          function(link) {
            link.removeAttribute('data-disabled')
          }
        );
        this.set_flag_alpha(('stop.s' + index), 0.7);
        this.set_rect_alpha(('rect.s' + index), 0.7);
      } else {
        this.current_snake = 'all';
        this.show_all();
      }
    }
    if (typeof leaderboard.hide_most == 'function') {
      leaderboard.hide_most();
    }
  }

  static
  solo_configs() {
    return [
      'grid',
      'swarm',
      'solo_famine'
    ]
  }

  static
  all_snake_configs() {
    return [
      'royale',
      'big',
      'all_famine'
    ]
  }

  static
  versus_configs() {
    return [
      'duel',
      'one_vs_five'
    ]
  }

}