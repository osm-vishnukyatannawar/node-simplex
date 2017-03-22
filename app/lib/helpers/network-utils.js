/**
 * Module of network utility functions
 */

'use strict';

// Third party modules
const os = require('os');
const _ = require('underscore');

/**
 * Finds and returns the IP-address for the given network
 * interface name.  If no network interface or IP-address
 * could be found, then null is returned.
 *
 * @param networkInterfaceName Network interface name (eg: 'eth0')
 * @returns {string} IP-address of the given network interface (null if not found)
 */
function getIpAddressForNetworkInterface (networkInterfaceName) {
  // default to return null if ip-address is not found
  var ipAddress = null;

  // get the set of available network interface names
  var availableInterfaces = os.networkInterfaces();

  // get the network interface associated with the given name
  var networkInterface = availableInterfaces[networkInterfaceName];

  // if the network interface is available
  if (networkInterface) {
    // find the interface associated with the name
    var nInterface = _.find(networkInterface, function (nInterface) {
      // skip any localhost or non-IPv4 addresses
      if (nInterface.family !== 'IPv4' || nInterface.internal !== false) {
        return false;
      } else {
        return true;
      }
    });

    // if an interface was found
    if (nInterface) {
      // get the ip-address for the interface
      ipAddress = nInterface.address;
    }
  }

  // return the ip-address (null if not found)
  return ipAddress;
}

// export the public module interface functions
module.exports = {
  getIpAddressForNetworkInterface: getIpAddressForNetworkInterface
};
