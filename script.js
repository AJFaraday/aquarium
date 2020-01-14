// The key is the score number
// it has an array of objects with func and args in them
// by default, these will be called on every frame until the score changes
// use type = 'once' for a one-shot action
Script = {
  0: [
    {func: 'show_help', message: 'The snake will follow your mouse pointer.', index: 0},
    {func: 'show_help', message: 'Try to catch the light blue goals.', index: 1}
  ],
  5: [
    {func: 'show_help', message: "What's THAT?!?", index: 1},
    {func: 'add_chaser', type: 'oneshot', x: 512, y: 768}
  ],
  7: [
    {func: 'show_help', message: 'Be careful not to bite your tail!', index: 0},
  ],
  10: [
    {func: 'show_help', message: 'Nice job! Ten points!', index: 0},
    {func: 'show_help', message: "You get 5 more health every ten points you get.", index: 1},
    {func: 'show_help', message: "You'll start to see more goals, too.", index: 2}
  ],
  15: [
    {func: 'show_help', message: "Your tail's getting pretty long now.", index: 0},
    {func: 'show_help', message: "If you bite off a little at the end, you only get a little bit hurt.", index: 1},
    {func: 'show_help', message: "But if you bite it all off...", index: 2},
  ],
  20: [
    {func: 'show_help', message: "Woo! Even more goals!", index: 0}
  ],
  22: [
    {func: 'show_help', message: "Oh no! What's that?!?", index: 0},
    {func: 'show_help', message: "Steer clear of the red marks!", index: 1}
  ],
  40: [
    {func: 'show_help', message: "NOOOOOOOOOOOO!", index: 0},
    {func: 'add_chaser', type: 'oneshot', x: 0, y: 0},
    {func: 'add_chaser', type: 'oneshot', x: 0, y: 768},
    {func: 'add_chaser', type: 'oneshot', x: 1024, y: 768},
    {func: 'add_chaser', type: 'oneshot', x: 1024, y: 0}
  ]

};
