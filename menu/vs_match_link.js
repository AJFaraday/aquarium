class VsMatchLink {

  constructor(colour1, colour2, url) {
    this.colour1 = Utils.change_alpha(colour1, '1');
    this.colour2 = Utils.change_alpha(colour2, '1');
    this.url = url;

    this.width = 40;
    this.height = 30;
    menu.form.appendChild(
      this.build_element('br', {})
    )
    menu.form.appendChild(
      this.build_svg()
    );
  }

  build_svg() {
    var svg = this.build_svg_element(
      {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'viewBox': ('0 0 ' + this.width + ' ' + this.height),
        width: this.width,
        height: this.height
      }
    );

    var defs = this.build_element('defs', {});
    svg.appendChild(defs);
    var gradient = this.build_element(
      'linearGradient',
      {id: 'grad' , x1: '0%', y1: '0%', x2: '100%', y2: '100%'}
    );
    defs.appendChild(gradient);
    gradient.appendChild(
      this.build_element('stop', {offset: '45%', 'stop-color': this.colour1, 'stop-opacity': 1})
    );
    gradient.appendChild(
      this.build_element('stop', {offset: '55%', 'stop-color': this.colour2, 'stop-opacity': 1})
    );

    var rect = this.build_element(
      'rect',
      {
        x: 0, y: 0,
        width: this.width, height: this.height,
        fill: 'url(#grad)'
      }
    );
    svg.append(rect);
    return svg;
  }

  build_element(tag, attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.keys(attrs).forEach(
      function(key){
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }

  build_svg_element(attrs) {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    Object.keys(attrs).forEach(
      function(key){
        element.setAttribute(key, attrs[key])
      }
    );
    return element;
  }


}
