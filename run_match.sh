export NODE_PATH=/usr/lib/node_modules

terser --compress -o aquarium.cli.min.js \
  lib/*.js \
  game.js \
  canvas.js \
  utils.js \
  mix.js \
  stats.js \
  concerns/*.js \
  static/*.js \
  creatures/*.js \
  behaviours/*.js \
  config.js \
  configs/*.js 

echo "module.exports = {Game: Game, Config: Config, Configs: Configs, Stats: Stats};" >> aquarium.cli.min.js

node command_line.js

