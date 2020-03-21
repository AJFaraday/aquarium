class AllSnakeFlag {

  constructor(config, title_width, menu) {
    this.config = config;
    this.url = menu.url_from_config(config);

    this.title_width = title_width;
    this.flag_width = 30;
    this.flag_height = 20;
    this.width = this.flag_width * Object.keys(Behaviours.count)

    this.build_title();
    this.build_svg();
    this.build_defs();
    this.build_flag();
  }


  build_svg() {

  }

  build_defs() {
    this.gradient_id = 'full_gradient';
    var gradient = this.build_element(
      'linearGradient',
      {id: this.gradient_id, x1: '0%', y1: '0%', x2: '100%', y2: '0%'}
    );
    Object.keys(Behaviours).forEach(
      function (behaviour, index) {
        // TODO add stops
      }
    );
  }

  build_stop(index, colour) {

  }

  build_flag() {
    this.svg = this.build_svg_element(
      {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'viewBox': ('0 0 ' + (this.total_width) + ' ' + this.total_height),
        'preserveAspectRatio': 'xMin',
        width: this.total_width,
        height: this.flag_height
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
