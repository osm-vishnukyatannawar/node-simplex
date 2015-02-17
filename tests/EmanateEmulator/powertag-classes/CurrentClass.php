<?php

require_once __DIR__. '/../config.php';

class Current {

    public $dataToSend;
    public $data;
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
        $this->type = CURRENT_TYPE;
        $this->CurrentData_startTimestamp = DEFAULT_VALUES;
        $this->CurrentData_numSamples = DEFAULT_VALUES;
        $this->CurrentDataUtil1_currentRms = DEFAULT_VALUES;
        $this->CurrentDataUtil1_utilVal = DEFAULT_VALUES;
        $this->CurrentDataUtil1_usageState = DEFAULT_VALUES;
        $this->CurrentDataUtil2_currentRms = DEFAULT_VALUES;
        $this->CurrentDataUtil2_utilVal = DEFAULT_VALUES;
        $this->CurrentDataUtil2_usageState = DEFAULT_VALUES;
    }

    public function getCurrentDataFormat($tagSN, $orgID) {

        $baseObj = new Base($tagSN, $orgID);

        $this->CurrentDataUtil1 = (object) ['currentRms' => $this->CurrentDataUtil1_currentRms,
                    'utilVal' => $this->CurrentDataUtil1_utilVal,
                    'usageState' => $this->CurrentDataUtil1_usageState];

        $this->CurrentDataUtil2 = (object) ['currentRms' => $this->CurrentDataUtil2_currentRms,
                    'utilVal' => $this->CurrentDataUtil2_utilVal,
                    'usageState' => $this->CurrentDataUtil2_usageState];

        $this->CurrentDataUtil = [$this->CurrentDataUtil1, $this->CurrentDataUtil2];

        $this->CurrentData = (object) ['startTimestamp' => $this->CurrentData_startTimestamp,
                    'numSamples' => $this->CurrentData_numSamples];

        $this->data = (object) ['CurrentData' => $this->CurrentData,
                    'CurrentDataUtil' => $this->CurrentDataUtil];

        $this->dataToSend = (object) ['customerID' => $baseObj->customerID,
                    'serialNum' => $baseObj->serialNum,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
