Space for your code.
=====================

## Custom code structure

1. Controllers, Services and Models are grouped together based on their entity. 
2. Third party module requires at the top of the file, and then put internal module includes.
3. Internal module variables should always be written in Pascal case.
4. `'use strict';` should be added at the top of all JavaScript files.
5. All entities created will always be in singular, and never in plural. So you'll have user instead of users,   

- Custom controllers will inherit AppController (app-controller.js)
- Custom services will inherit AppService (app-service.js)
- Custom models will inherit AppModel(app-model.js)

### Sample JS file

```js
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');

// Internal modules
var AppController = require(__CONFIG__.app_code_path + 'app-controller.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'getStatus.js');

var UserController = function(app) {
  AppController.call(this);
}

util.inherits(UserController, AppController);
```

### Sample folder structure 

```
code 
|
|-user
    |-user-controller.js
    |-user-service.js
    |-user-model.js
|-task
    |-task-controller.js
    |-task-service.js
    |-task-model.js    
```
## Reusing code

Code that you want to reuse between your services, models or controllers will be put inside either - 
  - app-controller.js
  - app-model.js
  - app-service.js 
  

## File naming conventions.

All file names will be written in the following format, for the **user** entity - 

  - user-controller.js
  - user-service.js
  - user-model.js

Lower case letters, and words will be seperated by hyphen.

**Also note that entities will never be in plural.**
