<?php
require_once 'config.php';

class Current {
    
    public $dataToSend;   
    public $data;   
    public $orgID;
    public $SN;
    public $type;
    public $CurrentData;
    public $CurrentData_startTimestamp;
    public $CurrentData_numSamples;
    public $CurrentDataUtil;
    public $CurrentDataUtil1;
    public $CurrentDataUtil1_currentRms;
    public $CurrentDataUtil1_utilVal;
    public $CurrentDataUtil1_usageState;
    public $CurrentDataUtil2;
    public $CurrentDataUtil2_currentRms;
    public $CurrentDataUtil2_utilVal;
    public $CurrentDataUtil2_usageState;
    
    public function __construct() {
         
        $this->orgID = '3';
        $this->SN = '3';
        $this->type = CURRENT_TYPE;
        $this->CurrentData_startTimestamp = 12;
        $this->CurrentData_numSamples = 23;
        $this->CurrentDataUtil1_currentRms = 45;
        $this->CurrentDataUtil1_utilVal = 2;
        $this->CurrentDataUtil1_usageState = 2;
        $this->CurrentDataUtil2_currentRms = 20;
        $this->CurrentDataUtil2_utilVal = 12;
        $this->CurrentDataUtil2_usageState = 3;
        
    }
    
    public function getCurrentDataFormat() {
        
        $this->CurrentDataUtil1 = (object) ['currentRms' => $this->CurrentDataUtil1_currentRms,
            'utilVal' => $this->CurrentDataUtil1_utilVal,
            'usageState' => $this->CurrentDataUtil1_usageState];
        
        $this->CurrentDataUtil2 = (object) ['currentRms' => $this->CurrentDataUtil2_currentRms,
            'utilVal' => $this->CurrentDataUtil2_utilVal,
            'usageState' => $this->CurrentDataUtil2_usageState];
        
        $this->CurrentDataUtil = [$this->CurrentDataUtil1,$this->CurrentDataUtil2];
        
        $this->CurrentData = (object) ['startTimestamp' => $this->CurrentData_startTimestamp,
            'numSamples' => $this->CurrentData_numSamples];
        
        $this->data = (object) ['CurrentData'=> $this->CurrentData,
            'CurrentDataUtil' => $this->CurrentDataUtil];
        
        $this->dataToSend = (object) ['orgID'=> $this->orgID,
            'SN'=> $this->SN,
            'type'=> $this->type,
            'data'=> $this->data];
        
        return $this->dataToSend;
        
    }
    
}


