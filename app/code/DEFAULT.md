# Demo Controller
 
```js
/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
var AppController = require(__CONFIG__.app_code_path + 'app-controller.js');
var UserService = require(__CONFIG__.app_code_path + 'user/user-service.js');

function UserController(app) {
  AppController.call(this);

  app.httpGet({
    url: '/user/:id',
    route: this.getUser.bind(this),
    isPublic: true,
    isAdmin: false
  });
}

util.inherits(UserController, AppController);

// Your code starts here.

UserController.prototype.getUser = function (request, response) {
  this.sendResponse(null, {
    'username': 'Abijeet Patro',
    'password': 'ABC'
  }, response);
}

module.exports = UserController;
```
# Demo Service 

```js
/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var AppService = require(__CONFIG__.app_code_path + 'app-service.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');
var UserModel = require(__CONFIG__.app_code_path + 'user/user-model.js');

function UserService(app) {  
  UserService.call(this);     
}

util.inherits(UserService, AppService);

// Your code starts here.

module.exports = UserService;
```

# Demo Model

```js
/* global __CONFIG__ */
'use strict';

// Third party modules
var fs = require('fs');
var async = require('async');
var util = require('util');

// Internal modules
var AppModel = require(__CONFIG__.app_code_path + 'app-model.js');
var GetStatus = require(__CONFIG__.app_lib_path + 'status.js');

function UserModel(app) {
  AppModel.call(this);     
}

util.inherits(UserModel, AppModel);

// Your code starts here.

module.exports = UserModel;
```

