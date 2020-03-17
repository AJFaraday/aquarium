class VsMatchFlag {

  constructor(behaviour1, behaviour2, x, y, title, url) {
    this.behaviour1 = new behaviour1;
    this.behaviour2 = new behaviour2;

    this.index1 = Object.keys(Behaviours).indexOf(behaviour1.name);
    this.index2 = Object.keys(Behaviours).indexOf(behaviour2.name);

    //this.colour1 = Utils.change_alpha(this.behaviour1.colour(), '1');
    //this.colour2 = Utils.change_alpha(this.behaviour2.colour(), '1');
    this.colour1 = this.behaviour1.colour();
    this.colour2 = this.behaviour2.colour();

    this.title = title;
    this.url = url;
    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 30;
  }

  gradient_tag() {
    this.gradient_id = 'grad' + this.index1 + 'vs' + this.index2;
    var gradient = this.build_element(
      'linearGradient',
      {id: this.gradient_id, x1: '0%', y1: '0%', x2: '100%', y2: '100%'}
    );
    gradient.appendChild(
      this.build_element('stop', {offset: '45%', 'stop-color': this.colour1, 'stop-opacity': 1})
    );
    gradient.appendChild(
      this.build_element('stop', {offset: '55%', 'stop-color': this.colour2, 'stop-opacity': 1})
    );
    return gradient;
  }

  rect_tag() {
    var link = this.build_element('a', {href: this.url, target: '_blank', title: this.title});
    var rect = this.build_element(
      'rect',
      {
        x: this.x, y: this.y,
        width: this.width, height: this.height,
        fill: 'url(#' + this.gradient_id + ')',
        title: this.title
      }
    );
    link.appendChild(rect);
    return link;
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
