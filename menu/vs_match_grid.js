class VsMatchGrid extends Grid {

  constructor(configs, no_behaviours, menu) {
    super();
    var grid = this;
    this.behaviour_names = [];
    Object.keys(Behaviours).forEach(
      function (key) {
        var behaviour = new Behaviours[key]();
        grid.behaviour_names.push(behaviour.name());
      }
    );
    var name_chars = Math.max(...this.behaviour_names.map(function (x) {
      return x.length
    }));
    this.flag_width = 40;
    this.flag_height = 30;
    this.width = this.flag_width * no_behaviours;
    this.height = this.flag_height * no_behaviours;
    this.title_height = 30;
    this.total_height = this.height + this.title_height;
    this.title_width = (name_chars * 8) + 5;
    this.total_width = this.width + this.title_width;

    this.build_svg();
    this.build_defs();
    this.build_labels();
    this.build_flags(configs, no_behaviours, menu);
  }

  build_side_labels() {
    var y = this.flag_height + this.title_height;
    var grid = this;
    Object.keys(Behaviours).forEach(
      function (key, index) {
        grid.build_side_label_colour(y, key, grid);
        var name = grid.behaviour_names[index];
        var text = grid.build_element(
          'text',
          {
            x: grid.title_width,
            y: (y - 7),
            style: 'font-size:15px;',
            'text-anchor': 'end'
          }
        );
        text.innerHTML = name;
        text.addEventListener(
          'click',
          function() {
            grid.highlight_snake(key);
          }
        );
        grid.svg.appendChild(text);
        y += grid.flag_height;
      }
    );
  }

  build_side_label_colour(y, behaviour_key, grid) {
    var behaviour = new Behaviours[behaviour_key]();
    var colour = behaviour.colour();
    var rect = grid.build_element(
      'rect',
      {
        x: 0,
        y: (y - grid.flag_height),
        width: grid.title_width,
        height: grid.flag_height,
        fill: Utils.change_alpha(colour, 0.2)
      }
    );
    rect.addEventListener(
      'click',
      function() {
        grid.highlight_snake(behaviour_key);
      }
    );
    grid.svg.appendChild(rect);
  }

  build_flags(configs, no_behaviours, menu) {
    var grid = this;
    configs.forEach(
      function (config, index) {
        var x = (index % no_behaviours) * grid.flag_width;
        var y = (Math.floor(index / no_behaviours) * grid.flag_height) + grid.title_height;
        var flag = new VsMatchFlag(
          config.starting_behaviours[0],
          config.starting_behaviours[1],
          (x + grid.title_width),
          y,
          config.name,
          menu.url_from_config(config)
        );
        grid.defs.appendChild(flag.gradient_tag());
        grid.svg.appendChild(flag.rect_tag());
      }
    );
  }

  build_defs() {
    this.defs = this.build_element('defs', {});
    this.svg.appendChild(this.defs);
  }


}