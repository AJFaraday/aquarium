export NODE_PATH=/usr/lib/node_modules

terser -o aquarium.cli.min.js \
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

echo "module.exports = {Game: Game, Config: Config, Configs: Configs, Behaviours: Behaviours, Behaviour: Behaviour};" >> aquarium.cli.min.js

terser --compress -o importer.cli.min.js \
  importer/fetcher.js \
  importer/validator.js \
  importer/checks/*.js

echo "module.exports = {Validator: Validator, Fetcher: Fetcher}" >> importer.cli.min.js

node import_answers.js