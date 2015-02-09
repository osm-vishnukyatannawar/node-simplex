<?php

define('CONFIG', serialize(array(1, 2, 3, 4, 5)));

//For maintenance call
define('MAINTENANCE_TYPE', 1);

//For tag info call
define('TAGINFO_TYPE', 5);

//For histogram call
define('HISTOGRAM_TYPE', 2);

//For current data call
define('CURRENT_TYPE', 4);

//For PIM data call
define('PIM_TYPE', 3);

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