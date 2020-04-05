class AllSnakeFlag {

  constructor(config, title_width, menu) {
    this.config = config;
    this.url = menu.url_from_config(config);

    this.title_width = title_width;
    this.flag_width = 40;
    this.flag_height = 40;
    this.width = (this.flag_width * Object.keys(Behaviours).length);
    this.total_width = this.width + title_width;


    this.build_svg();
    this.build_defs();
    this.build_flag();
  }

  title() {
    var title = document.createElement('h1');
    title.innerHTML = this.config.title;
    return title;
  }

  build_svg() {
    this.svg = this.build_svg_element(
      {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'viewBox': ('0 0 ' + (this.total_width) + ' ' + this.flag_height),
        'preserveAspectRatio': 'xMinYMin',
        width: this.total_width,
        height: this.flag_height
      }
    );

  }

  build_defs() {
    var flag = this;
    this.gradient_id = 'full_gradient';
    var gradient = this.build_element(
      'linearGradient',
      {id: this.gradient_id, x1: '0%', y1: '0%', x2: '100%', y2: '0%'}
    );
    Object.keys(Behaviours).forEach(
      function(behaviour_name, index) {
        var behaviour = new Behaviours[behaviour_name]();
        var stop = flag.build_stop(index, behaviour.colour());
        gradient.appendChild(stop);
      }
    );
    this.svg.appendChild(gradient);
  }

  build_stop(index, colour) {
    var no_behaviours = Object.keys(Behaviours).length;
    return this.build_element(
      'stop',
      {
        'stop-color': colour,
        offset: Math.floor((index + 0.5) * (100 / no_behaviours)) + '%',
        'stop-opacity': 1,
        class: 's' + index
      }
    );

  }

  build_flag() {
    var link = this.build_element(
      'a',
      {
        href: this.url,
        target: '_blank'
      }
    );
    var rect = this.build_element(
      'rect',
      {
        x: this.title_width,
        y: 0,
        width: this.width,
        height: this.flag_height,
        fill: 'url(#full_gradient)'
      }
    );
    var title = this.build_element('title', {});
    title.innerHTML = this.config.title;
    rect.appendChild(title);
    link.appendChild(rect);
    this.svg.appendChild(link)
  }


  build_element(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs).forEach(
      function(key) {
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

  build_svg_element(attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.keys(attrs).forEach(
      function(key) {
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

}
