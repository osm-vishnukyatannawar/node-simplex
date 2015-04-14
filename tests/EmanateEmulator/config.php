<?php
date_default_timezone_set('UTC');
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
define('ORG_ID', 1271);

// Default values
define('DEFAULT_VALUES', 101);

// Config Params
define('POWERPATH_UPDATE_CONFIG_PARAM', 6);

define('BASE_URL', 'http://cloud.emanatewireless.com/api/v1/');

// WS URL
define('WS_URL', 'http://cloud.emanatewireless.com/api/v1/tag/maintenance/');

// Sleep time in seconds
define('SLEEP_TIME', 0);

//Look up values for powerpath firmware updation commands

define('LOOKUP_VALUES', serialize(array(7,11,15)));

// Default values to be added in Rms value
define('DEFAULT_ADDED_RMS_VALUE', 60);

// Default values to be added in util value
define('DEFAULT_UTIL_VALUE', 20);

// Default values of number of blocks i.e. number of time currentUtilMeasurement will be calculated.
define('DEFAULT_NUMBER_OF_SAMPLES', 4);

// Starting the series
define('SERIES_START', 1696194626);

// Count
define('SERIES_COUNT', 58);

// Multiple tags
define('MULTIPLE_TAGS', true);

//Mac address series
define('MAC_ADDRESS_START', 4496078144);

