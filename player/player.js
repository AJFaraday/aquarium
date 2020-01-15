if (typeof Player === 'undefined') {
  Player = {}
}

Player.init = function () {
  Player.head = new Player.Head();
  Player.score = new Player.Score();
  Player.health = new Player.Health();
  Player.target = new Player.MoveTarget();
};

Player.set_target = function(x,y) {
  var rect = Game.canvas.canvas.getBoundingClientRect();
  Player.head.target.x = x - rect.left;
  Player.head.target.y = y - rect.top;
};
