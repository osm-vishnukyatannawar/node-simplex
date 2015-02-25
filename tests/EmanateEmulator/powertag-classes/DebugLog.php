<?php

require_once __DIR__. '/../config.php';

/**
 * Description of DebugLog
 *
 * @author abijeetpatro
 */
class DebugLog {

    public function __construct($dfltData) {
        $this->type = POWERPATH_SEND_DEBUG_LOG;
        $this->log = 'Log == ' . $dfltData;
    }

    public function getDebugLog($tagSN, $orgID, $dfltData) {
        $baseObj = new Base($tagSN, $orgID, $dfltData);

        return (object) [
            'customerID' => $baseObj->customerID,
            'serialNum' => $baseObj->serialNum,
            'defaultData' => $baseObj->defaultData,
            'type' => $this->type,
            'log' => $this->log
        ];
    }

}
