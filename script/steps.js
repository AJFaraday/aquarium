if (typeof Script === 'undefined') {
  Script = {}
}

// The key is the score number
// it has an array of objects with func and args in them
// by default, these will be called on every frame until the score changes
// use type = 'once' for a one-shot action
Script.Steps = {
  0: [
    {func: 'show_help', message: 'The snake will follow your mouse pointer.', index: 0},
    {func: 'show_help', message: 'Try to catch the light blue goals.', index: 1}
  ],
  /*
  1: [
    {func: 'add_enemy', type: 'oneshot', x: 200, y: 200, enemy_type: 'Teleporter'},
    {func: 'add_enemy', type: 'oneshot', x: 200, y: 200, enemy_type: 'Chaser'},
  ]
   */
  5: [
    {func: 'show_help', message: "What's THAT?!?", index: 1},
    {func: 'add_enemy', type: 'oneshot', x: 512, y: 768, enemy_type: 'Missile'}
  ],
  7: [
    {func: 'show_help', message: 'Be careful not to bite your tail!', index: 0},
  ],
  10: [
    {func: 'show_help', message: 'Nice job! Ten points!', index: 0},
    {func: 'show_help', message: "You get 5 more health every ten points you get.", index: 1},
    {func: 'show_help', message: "Steer clear of the red marks, tho.", index: 2}
  ],
  15: [
    {func: 'show_help', message: 'Enemies are dangerous, BUT', index: 0},
    {func: 'show_help', message: 'They only live for 10 seconds,', index: 1},
    {func: 'show_help', message: 'Stay safe out there!', index: 2},
    {func: 'add_enemy', type: 'oneshot', x: 200, y: 200, enemy_type: 'Chaser'}
  ],
  17: [
    {func: 'add_enemy', type: 'oneshot', x: 200, y: 200, enemy_type: 'Teleporter'}
  ],
  20: [
    {func: 'add_enemy', type: 'oneshot', x: 512, y: 768, enemy_type: 'Missile'}
  ]
  // How about a rival next time?
};
