<?php

require_once __DIR__. '/../config.php';

/**
 * Description of DebugLog
 *
 * @author abijeetpatro
 */
class DebugLog {

    public function __construct() {
        $this->type = POWERPATH_SEND_DEBUG_LOG;
        $this->log = 'Log == ' . DEFAULT_VALUES;
    }

    public function getDebugLog($tagSN, $orgID) {
        $baseObj = new Base($tagSN, $orgID);

        return (object) [
            'customerID' => $baseObj->customerID,
            'serialNum' => $baseObj->serialNum,
            'type' => $this->type,
            'log' => $this->log
        ];
    }

}
