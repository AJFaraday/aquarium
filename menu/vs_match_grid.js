class VsMatchGrid {

  constructor(configs, no_behaviours, menu) {
    var grid = this;
    this.behaviour_names = [];
    Object.keys(Behaviours).forEach(
      function(key) {
        var behaviour = new Behaviours[key]();
        grid.behaviour_names.push(behaviour.name());
      }
    );
    var name_chars = Math.max(...this.behaviour_names.map(function(x) {return x.length}));

    this.flag_width = 40;
    this.flag_height = 30;
    this.width = this.flag_width * no_behaviours;
    this.height = this.flag_height * no_behaviours;
    this.title_height = 30;
    this.total_height = this.height + this.title_height;
    this.title_width = (name_chars * 8) + 5;
    this.total_width = this.width + this.title_width;

    this.build_svg();
    this.build_labels();
    this.build_flags(configs, no_behaviours, menu);
  }

  build_labels() {
    this.build_top_labels();
    this.build_side_labels();
  }

  build_top_labels() {
    var x = this.title_width + 15;
    var y = 20;
    var grid = this;
    Object.keys(Behaviours).forEach(
      function (key, index) {
        var name = grid.behaviour_names[index][0];
        var text = grid.build_element(
          'text',
          {
            x: x,
            y: y,
            style: 'font-size:20px;',
            'text-anchor': 'start'
          }
        );
        text.innerHTML = name;
        grid.svg.appendChild(text);
        x += grid.flag_width;
      }
    );
  }

  build_side_labels() {
    var y = this.flag_height + this.title_height;
    var grid = this;
    Object.keys(Behaviours).forEach(
      function (key, index) {
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
        grid.svg.appendChild(text);
        y += grid.flag_height;
      }
    );
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

  build_svg() {
    this.svg = this.build_svg_element(
      {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'viewBox': ('0 0 ' + (this.total_width) + ' ' + this.total_height),
        'preserveAspectRatio': 'xMin',
        width: this.total_width,
        height: this.total_height
      }
    );
    this.defs = this.build_element('defs', {});
    this.svg.appendChild(this.defs);
  }

  build_element(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs).forEach(
      function (key) {
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

  build_svg_element(attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.keys(attrs).forEach(
      function (key) {
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

}