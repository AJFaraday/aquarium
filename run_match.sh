export NODE_PATH=/usr/lib/node_modules

terser --compress -o aquarium.cli.min.js \
  lib/*.js \
  config.js \
  game.js \
  canvas.js \
  utils.js \
  mix.js \
  strategies.js \
  concerns/*.js \
  static/*.js \
  creatures/*.js

echo "module.exports = Game;" >> aquarium.cli.min.js

node command_line.js