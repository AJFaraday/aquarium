class Utils {

  static angleDifference(angle1, angle2) {
    var diff = (angle2 - angle1 + 180) % 360 - 180;
    if (diff < -180) {
      return diff + 360;
    } else {
      return diff;
    }
  }

  static outOfRange(thing) {
    return thing.x < -200
      || thing.x > (Game.width + 200)
      || thing.y < -200
      || thing.y > (Game.height + 200)
  }

  // Note: Things always have an x and a y component
  static angleBetweenPoints(thing_one, thing_two) {
    return ((Math.atan2(thing_one.y - thing_two.y, thing_one.x - thing_two.x) * 180 / Math.PI) + 180);
  }

  static distanceBetweenPoints(thing_one, thing_two) {
    var a = thing_one.x - thing_two.x;
    var b = thing_one.y - thing_two.y;

    return Math.sqrt(a * a + b * b);
  }

  // for this, things need size, too
  static touching(thing_one, thing_two) {
    var distance_between_things = Utils.distanceBetweenPoints(thing_one, thing_two);
    return (distance_between_things <= (thing_one.size + thing_two.size));
  }

  static median(array) {
    var mid = Math.floor(array.length / 2);
    var nums = [...array].sort((a, b) => a - b);
    return nums[mid];
  }

  static url_vars() {
    if(typeof window != 'undefined') {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
      });
      return vars;
    }
  }
}