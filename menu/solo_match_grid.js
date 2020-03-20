class SoloMatchGrid extends Grid {

  constructor(configs, no_behaviours, menu) {
    super();
    this.configs = configs;
    var grid = this;
    this.behaviour_names = [];
    Object.keys(Behaviours).forEach(
      function (key) {
        var behaviour = new Behaviours[key]();
        grid.behaviour_names.push(behaviour.name());
      }
    );
    var name_chars = Math.max(...Object.keys(this.configs).map(function (x) {
      return Configs[x].title.length
    }));
    this.flag_width = 40;
    this.flag_height = 30;
    this.width = this.flag_width * no_behaviours;
    this.height = this.flag_height * Object.keys(configs).length;
    this.title_height = 30;
    this.total_height = this.height + this.title_height;
    this.title_width = (name_chars * 9) + 5;
    this.total_width = this.width + this.title_width;

    this.build_svg();
    this.build_labels();
    this.build_flags(configs, no_behaviours, menu);
  }

  build_side_labels() {
    var y = this.flag_height + this.title_height;
    var grid = this;
    Object.keys(grid.configs).forEach(
      function (key, index) {
        var config = Configs[key];
        var name = config.title;
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
        grid.svg.appendChild(text);
        y += grid.flag_height;
      }
    );
  }

  build_flags(configs, no_behaviours, menu) {
    var grid = this;
    Object.keys(configs).forEach(
      function (config_name, row_index) {
        grid.configs[config_name].forEach(
          function (config, column_index) {
            var x = (column_index % no_behaviours) * grid.flag_width;
            var y = (row_index * grid.flag_height) + grid.title_height;
            var flag = new SoloMatchFlag(
              config.starting_behaviours[0],
              (x + grid.title_width),
              y,
              config.name,
              menu.url_from_config(config)
            );
            grid.svg.appendChild(flag.rect_tag());
          }
        )
      }
    );
  }

}