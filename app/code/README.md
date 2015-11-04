Space for your code.
=====================

Check *DEFAULT.md* for a template of a controller, model and service. 

## Custom code structure

1. Controllers, Services and Models are grouped together based on their entity. 
2. Third party module requires at the top of the file, and then put internal module includes.
3. Internal module variables should always be written in Pascal case.
4. `'use strict';` should be added at the top of all JavaScript files.
5. All entities created will always be in singular, and never in plural. So you'll have *user* instead of *users*,   
6. Custom controllers will inherit AppController (`app-controller.js`)
7. Custom services will inherit AppService (`app-service.js`)
8. Custom models will inherit AppModel(`app-model.js`)

### Sample JS file

```js
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var AppController = require(__CONFIG__.app_code_path + 'app-controller.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');

function UserController(app) {
  AppController.call(this); 
  
  app.httpGet({ 
    url : '/user/:id',
    route : this.getUser.bind(this),
    isPublic : true,
    isAdmin : false
  });
}

util.inherits(UserController, AppController);

UserController.prototype.getUser = function(request, response) {}

module.exports = UserController;
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

## Naming conventions

1. Model variables will always start with 'm' - mUser, mCountry etc
2. Service variables will always sttart with 's' - sUser, sCountry etc
3. Controller, service and model names will also be in singular.

## Constant usage

Constants / Functions have been created to fetch the following values -

1. `app_base_path` - Returns the path to the app folder 
2. `app_code_path` - Returns the path the the app/code folder
3. `app_lib_path` - Returns the path to the app/lib folder
4. `app_helper_path` - Returns the path to the app/lib/helpers folder
5. `getFilesFolderPath` - (*Function*) Returns the path to the files folder in the base of the application.
6. `getUploadsFolderPath` - (*Function*) Returns the path to the upload folder in the base of the application.
7. `getLogsFolderPath` - (*Function*) Returns the path to the application's log folder

### Usage

```js
var codePath = __CONFIG__.app_code_path;
var uploadsFolderPath = __CONFIG__.getUploadsFolderPath();
```