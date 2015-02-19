<?php

define('CONFIG', serialize(array(1, 2, 3, 4, 5)));

/***
 * Response command start
 */
define('MAINTENANCE_TYPE', 1);
define('TAGINFO_TYPE', 5);
define('HISTOGRAM_TYPE', 2);
define('CURRENT_TYPE', 4);
define('PIM_TYPE', 3);
define('POWERPATH_SEND_DEBUG_LOG', 9);
define('POWERPATH_REPORT_USD_DEBUG_DATA', 16);

/**
 * Response command end
 */

// USE THIS AS THE SERIAL NUMBER EVERYWHERE
define('TAG_SN', 8600);

// USE THIS AS THE ORGANIZATION ID EVERYWHERE
define('ORG_ID', 1001);

// Default values
define('DEFAULT_VALUES', 123);

// Config Params
define('POWERPATH_UPDATE_CONFIG_PARAM', 6);

define('BASE_URL', 'http://10.0.0.15:3000/api/v1/');

// WS URL
define('WS_URL', 'http://10.0.0.15:3000/api/v1/tag/maintenance/');

// Sleep time in seconds
define('SLEEP_TIME', 1);

//Look up values for powerpath firmware updation commands

define('LOOKUP_VALUES', serialize(array(7,11,15)));