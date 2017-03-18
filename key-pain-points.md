* Re-design the logger methods to log the following information separately.

  - Warnings
  - Errors
  - Info
  - Uncaught errors

* We need to fix the format of the log files.

* We need to configure eslint, so that we can avoid writing unnecessary code like declaring variables and not using them.

* Remove https redirection from the server app and SSL configuration from the config file.

* Modify the response object to include the error and success codes.

```js
// Success object
{
  status: 'success', // Status of the request
  code: 0, // Always 0 for the success response
  data: {} // Any additional information
}
// Error object
{
  status: 'fail', // Status of the request
  code: 123, // Error code
  data: {}, // Any additional information
  message: 'Error!', // Message shown to the user
  validations: [] // Any validation errors
}
```
* We need to know immediately whenever server crashed due to an uncaught exception.
* Configure **i18n** module to add support for internalization of messages and all the messages that are sent to the client
should fetch from the **en.json** file.
```js
// Use express
const express = require('express');
let app = express();
// Require i18n module
const i18n = require('i18n');
// Configure the module
i18n.configure({
  locales: ['en'],
  defaultLocale: 'en',
  directory: '../locales',
  objectNotation: true // Use always object notation
});
// Initialize the i18n module
app.use(i18n.init);
```

* Need load helper class to return the different paths of projects folder (logs, files, uploads etc..)
* Need to fix the issues with running multiple queries in the same connection.
* We need to add support row callback after executing the select statements (Already we did this in one of our projects.)

```js
{
  rowCb: customFunction,
  rowCbParams: [timezone]
}
```
* We are not following data types while sending the response back to the client. I think we should implement this.

```js
{
  name: 'testaccount',
  age: '23', // Should be of type integer
  dob: '23/02/2014', // Should be in UTC string - 2017-01-16T20:35:29+05:30
  address: 'testaddress',
  pin: '534301' // Should be of type integer
}
```
* Add retry transaction support in mariasql wrapper class.
* Don't include the token in the the URL rather than accept in the request header.
We need to update the following method in `route-helper.js` file.
```js
// Returns the final URL based on the config value
function getFinalUrl(url, isPublic) {
  // Remove this line
  var finalUrl = __CONFIG__.app_base_url_token + url;
  if (isPublic) {
    finalUrl = __CONFIG__.app_base_url + url;
  }
  return finalUrl;
};
```
* Currently, in the API we are not handling the error properly if the request payload is higher than the expected for GET and DELETE requests.
* Adding CORS support.
```js
const express = require('express');
// Requiring cors module
const cors = require('cors');
const app = express();
// Configuring the express app to support cors
app.use(cors());
```
* Currently, we are not validaing the size of the data received in the request.body (POST and PUT).
* We are not handling response headers properly while sending the files.
