Utils = {

  drawPolygon: function (centerX, centerY, sideCount, size, strokeWidth, strokeColor, fillColor, rotationDegrees) {
    var radians = rotationDegrees * Math.PI / 180;
    Canvas.ctx.translate(centerX, centerY);
    Canvas.ctx.rotate(radians);
    Canvas.ctx.beginPath();
    Canvas.ctx.moveTo(size * Math.cos(0), size * Math.sin(0));
    for (var i = 1; i <= sideCount; i += 1) {
      Canvas.ctx.lineTo(size * Math.cos(i * 2 * Math.PI / sideCount), size * Math.sin(i * 2 * Math.PI / sideCount));
    }
    Canvas.ctx.closePath();
    Canvas.ctx.fillStyle = fillColor;
    Canvas.ctx.strokeStyle = strokeColor;
    Canvas.ctx.lineWidth = strokeWidth;
    Canvas.ctx.stroke();
    Canvas.ctx.fill();
    Canvas.ctx.rotate(-radians);
    Canvas.ctx.translate(-centerX, -centerY);
  },

  angleDifference: function(angle1, angle2) {
    var diff = ( angle2 - angle1 + 180 ) % 360 - 180;
    if (diff < -180) {
      return diff + 360;
    } else {
      return diff;
    }
  },

  angleBetweenPoints: function(x1, y1, x2, y2) {
    return ((Math.atan2(y1 - y2, x1 - x2) * 180 / Math.PI) + 180);
  },

  distanceBetweenPoints: function(x1, y1, x2, y2) {
    var a = x1 - x2;
    var b = y1 - y2;

    return Math.sqrt( a*a + b*b );
  }
};