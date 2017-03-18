## package.json

* Remove **^** and **~** from package.json file.

## config.js

* Use path module to join the file paths.
```js
const path = require('path');
let service = require(path.join(__dirname, 'service');
```
* Remove email passwords and any other important credentials from the configuration file. Use environmental variables to do this.
```sh
# In users bashrc file, declare the variables like as follows,
export OSM_USER_EMAIL=admin@osmosys.asia;
export OSM_USER_PWD=admin;
```
```js
// Use environment variables in your code as follows
const email = process.env.OSM_USER_EMAIL;
const pwd = process.env.OSM_USER_PWD;
```

## ES Lint

* Configure **eslint**. It will take of care of unused variables, missing semicolons etc..
* Remove **JSHint** configuration.

## .gitignore

* All IDE related settings files should be placed here.
```sh
# VS code settings folder
.vscode
# Eclipse settings folder
.project
.settings
# Logs and uploads folder paths
logs/
uploads/
```

## slogerr-config.js

* Change the value of customer to Osmosys.