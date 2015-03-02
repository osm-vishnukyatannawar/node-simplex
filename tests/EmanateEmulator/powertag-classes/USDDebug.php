<?php
require_once __DIR__. '/../config.php';
/**
 * Description of USDDebug
 *
 * @author abijeetpatro
 */
class USDDebug {
    
    public function __construct($dfltData) {
        $this->type = POWERPATH_REPORT_USD_DEBUG_DATA;
        $this->data = 'default data = ' . $dfltData;
    }
    
    public function getUsdDebugData($tagSN, $orgID, $dfltData) {
        $baseObj = new Base($tagSN, $orgID, $dfltData);
        
        return (object) [
            'customerID' => $baseObj->customerID,
            'serialNum' => $baseObj->serialNum,
            'defaultData' => $baseObj->defaultData,
            'type' => $this->type,
            'data' => $this->data            
        ];
    }
}
