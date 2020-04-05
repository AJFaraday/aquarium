class Behaviour {

  constructor(snake) {
    this.snake = snake;
  }

  //////////////////////
  //// Placeholders ////
  //////////////////////

  // Called when the snake is initialized
  // then only called by other methods here
  set_target() {

  }

  // Called when a new food is added to the game
  new_food() {

  }

  // Called whenever the target isn't a member of food or snake collections
  target_removed() {

  }

  // Called when this snake bites a snake's tail
  // victim is the snake that was bitten (can be this.snake)
  bite_tail(victim) {

  }

  // Called when this snake's tail get's bitten
  // bitten_by is the snake that did it (can be this.snake)
  tail_bitten(bitten_by) {

  }

  // Called when this snake eats something
  eat() {

  }

  // Called wehn this snake eats the thing it's targetting
  eat_target() {

  }

  // Called when this snake loses a tail segment due to starvation
  starve() {

  }

  // Called every tick (100 times a second)
  every_tick() {

  }

  // Called every tick when there's no food in the game
  idle() {
    // Default 'milling about' behaviour, can be overridden
    if(typeof this.idle_target_tick == 'undefined') {
      this.idle_target_tick = 0;
    }
    if(typeof this.idle_inteval == 'undefined') {
      this.idle_interval = (Math.random() * 400) + 100;
    }
    if((this.tick() - this.idle_target_tick) > this.idle_interval) {
      this.idle_target_tick = Game.tick;
      this.snake.target = {x: (Math.random() * Game.width), y: (Math.random() * Game.height)};
    }
  }

  //////////////////////
  /////// Helpers //////
  //////////////////////

  x() {
    return this.snake.x;
  }

  y() {
    return this.snake.y;
  }

  food() {
    return Game.food;
  }

  snakes() {
    return Game.snakes.map(function(s){Behaviour.snake_proxy(s)});
  }

  tick() {
    return Game.tick;
  }

  length() {
    return this.snakes.tail_segments.length;
  }

  last_ate_tick() {
    return this.snake.last_ate_tick();
  }

  utils() {
    return Utils;
  }

  game_width() {
    return Game.width;
  }

  game_height() {
    return Game.height;
  }

  angle() {
    return this.snake.get_angle();
  }

  target(object) {
    if ((typeof object != 'undefined') && (typeof object.x == 'number') && (typeof object.y == 'number')) {
      this.snake.target = object
    } else {
      console.log(this.snake.name + ": Invalid target object");
      console.log(object);
      throw this.snake.name + ": Invalid target object";
    }
  }

  ////////////////////////////////////


  static snake_proxy(snake) {
    return {
      x: snake.x,
      y: snake.y,
      size: snake.size,
      speed: snake.speed,
      angle: snake.angle,
      tail_segments: snake.tail_segments.map(
        function(segment) {
          return Behaviour.tail_segment_proxy(segment)
        }
      )
    }
  };

  static tail_segment_proxy(tail_segment) {
    return {
      x: tail_segment.x,
      y: tail_segment.y,
      size: tail_segment.size
    }
  }


}
