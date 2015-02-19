<?php
require_once __DIR__. '/../config.php';
/**
 * Description of USDDebug
 *
 * @author abijeetpatro
 */
class USDDebug {
    
    public function __construct() {
        $this->type = POWERPATH_REPORT_USD_DEBUG_DATA;
        $this->data = 'default data = ' . DEFAULT_VALUES;
    }
    
    public function getUsdDebugData($tagSN, $orgID) {
        $baseObj = new Base($tagSN, $orgID);
        
        return (object) [
            'customerID' => $baseObj->customerID,
            'serialNum' => $baseObj->serialNum,
            'type' => $this->type,
            'data' => $this->data            
        ];
    }
}
