export NODE_PATH=/usr/lib/node_modules

terser --compress -o aquarium.cli.min.js \
  lib/*.js \
  game.js \
  canvas.js \
  utils.js \
  mix.js \
  strategies.js \
  concerns/*.js \
  static/*.js \
  creatures/*.js \
  behaviours/*.js \
  config.js \
  configs/*.js 

echo "module.exports = {Game: Game, Config: Config, Configs: Configs};" >> aquarium.cli.min.js

node command_line.js