export NODE_PATH=/usr/lib/node_modules

terser -o aquarium.cli.min.js \
  lib/*.js \
  game.js \
  canvas.js \
  utils.js \
  mix.js \
  concerns/*.js \
  static/*.js \
  creatures/*.js \
  behaviours/*.js \
  config.js \
  configs/*.js

echo "module.exports = {Game: Game, Config: Config, Configs: Configs, Behaviours: Behaviours};" >> aquarium.cli.min.js

terser --compress -o validator.cli.min.js \
  validator/fetcher.js \
  validator/validator.js \
  validator/checks/*.js

echo "module.exports = {Validator: Validator, Fetcher: Fetcher}" >> validator.cli.min.js

node validate_behaviours.js