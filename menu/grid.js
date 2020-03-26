class Grid {

  constructor() {
  }

  build_labels() {
    this.build_top_labels();
    this.build_side_labels();
  }

  highlight_snake(key) {
    menu.snake_select.value = key;
    document.cookie = ('snake=' + menu.snake_select.selectedOptions[0].value)
    menu.show_snake(key);
  }

  build_top_labels() {
    var x = this.title_width + 15;
    var y = 20;
    var grid = this;
    Object.keys(Behaviours).forEach(
      function (key, index) {
        grid.build_top_label_colour(x, y, key, grid);
        var name = grid.behaviour_names[index][0];
        var text = grid.build_element(
          'text',
          {
            x: (x + 7.5),
            y: (y + 2),
            style: 'font-size:20px;',
            'text-anchor': 'middle'
          }
        );
        text.innerHTML = name;
        var title = grid.build_element('title', {});
        title.innerHTML = grid.behaviour_names[index];
        text.appendChild(title);
        text.addEventListener(
          'click',
          function(e) {
            grid.highlight_snake(key);
          }
        );
        grid.svg.appendChild(text);
        x += grid.flag_width;
      }
    );
  }

  build_top_label_colour(x, y, behaviour_key, grid) {
    var behaviour = new Behaviours[behaviour_key]();
    var colour = behaviour.colour();
    var circle = grid.build_element(
      'circle',
      {
        cx: (x + 7.5),
        cy: (y - 5),
        r: 15,
        fill: colour
      }
    );
    circle.addEventListener(
      'click',
      function(e) {
        grid.highlight_snake(behaviour_key);
      }
    );
    grid.svg.appendChild(circle);
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