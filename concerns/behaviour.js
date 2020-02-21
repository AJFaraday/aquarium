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

  food() {
    return Game.food;
  }

  snakes() {
    return Game.snakes;
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



}
