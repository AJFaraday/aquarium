class SoloMatchFlag {

  constructor(behaviour, x, y, title, url) {
    this.behaviour = new behaviour;

    this.index = Object.keys(Behaviours).indexOf(behaviour.name);

    this.colour = this.behaviour.colour();

    this.title = title;
    this.url = url;
    this.x = x;
    this.y = y;

    this.width = 40;
    this.height = 30;
  }

  rect_tag() {
    var link = this.build_element(
      'a',
      {href: this.url, target: '_blank', class: `s${this.index}`}
    );
    link.addEventListener(
      'click',
      function (event) {
        if (link.attributes['data-disabled']) {
          event.preventDefault();
        }
      }
    );
    var rect = this.build_element(
      'rect',
      {
        x: this.x, y: this.y,
        width: this.width, height: this.height,
        fill: this.colour,
        class: 's' + this.index
      }
    );
    var title = this.build_element('title', {});
    title.innerHTML = this.title;
    rect.append(title);
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
