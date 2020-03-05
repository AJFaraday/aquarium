# Aquarium

Simulation of an imagined ecology where snake-like creatures
compete for food and survival based on pre-defined behaviours.

# Try it out:

The live version of the app is running at https://ajfaraday.github.io/aquarium/

Currently it allows no configuration changes. 

# Install

* `git clone https://github.com/AJFaraday/aquarium.git`

# To use

Just open index.html

You can play with the config.js file to define a scenario. 
Then just hard-refresh the page.

# To develop

You can change any js files in place and instantly
see their result by opening dev_index.html

# To deploy

First, you need terser:

```bash
sudo npm install terser -g
```

Minify the code into aquarium.min.js

```bash
./package.sh
```

If you're me, push to master.

If you're not me, put in a PR.

Currently, the master branch is available at

https://ajfaraday.github.io/aquarium/

# Run in command line

First, you need terser:

```bash
sudo npm install terser -g
```

For now, just run this 

```bash
./run_match.sh
```

# Validator

```bash
sudo npm install terser -g
sudo npm install -g request@2.81.0
sudo npm install -g node-html-parser

```