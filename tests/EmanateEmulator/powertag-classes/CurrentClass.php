<?php

require_once __DIR__. '/../config.php';

class Current {

    public $dataToSend;
    public $data;
    public $type;
    public $currentHeader;
    public $currentTimeStamp;
    public $numBlocks;
    public $currentUtilization = array();
    public $currentUtilHeader;
    public $numSamples;
    public $currentUtilMeasurements = array();
    public $currentRms;
    public $utilVal;
    public $usageState;
    public $startTimeStamp;
    public $startTimeStamp_tm_sec;
    public $startTimeStamp_tm_min;
    public $startTimeStamp_tm_hour;
    public $startTimeStamp_tm_mday;
    public $startTimeStamp_tm_mon;
    public $startTimeStamp_tm_year;
    public $currentTimeStamp_tm_sec;
    public $currentTimeStamp_tm_min;
    public $currentTimeStamp_tm_hour;
    public $currentTimeStamp_tm_mday;
    public $currentTimeStamp_tm_mon;
    public $currentTimeStamp_tm_year;
    public $CurrentDataUtil;

    public function __construct($dfltData) {
        $this->type = CURRENT_TYPE;
        $this->currentRms = $dfltData;
        $this->utilVal = $dfltData;
        $this->usageState = $dfltData;
        $this->numSamples = $dfltData;
        $this->currentTimeStamp_tm_sec = $dfltData;
        $this->currentTimeStamp_tm_min = $dfltData;
        $this->currentTimeStamp_tm_hour = $dfltData;
        $this->currentTimeStamp_tm_mday = $dfltData;
        $this->currentTimeStamp_tm_mon = $dfltData;
        $this->currentTimeStamp_tm_year = $dfltData;
        $this->startTimeStamp_tm_sec = $dfltData;
        $this->startTimeStamp_tm_min = $dfltData;
        $this->startTimeStamp_tm_hour = $dfltData;
        $this->startTimeStamp_tm_mday = $dfltData;
        $this->startTimeStamp_tm_mon = $dfltData;
        $this->startTimeStamp_tm_year = $dfltData;
        $this->numBlocks = $dfltData;
    }

    public function getCurrentDataFormat($tagSN, $orgID, $dfltData) {
        $baseObj = new Base($tagSN, $orgID, $dfltData);
        
        $utilArr = ['currentRms' => $this->currentRms,
           'utilVal' => $this->utilVal,
           'usageState' =>  $this->usageState];
        
        for($i = 0; $i <= 9; ++$i) {
            array_push($this->currentUtilMeasurements, (object) $utilArr);
        }
        
        $this->currentTimeStamp = (object) ['tm_sec' => $this->currentTimeStamp_tm_sec,
            'tm_min' => $this->currentTimeStamp_tm_min,
            'tm_hour' => $this->currentTimeStamp_tm_hour,
            'tm_mday' => $this->currentTimeStamp_tm_mday,
            'tm_mon' => $this->currentTimeStamp_tm_mon,
            'tm_year' => $this->currentTimeStamp_tm_year];
        
        $this->currentHeader = (object) ['currentTimeStamp' => $this->currentTimeStamp, 'numBlocks' => $this->numBlocks];
        
        $this->startTimeStamp = (object) ['tm_sec' => $this->startTimeStamp_tm_sec,
            'tm_min' => $this->startTimeStamp_tm_min,
            'tm_hour' => $this->startTimeStamp_tm_hour,
            'tm_mday' => $this->startTimeStamp_tm_sec,
            'tm_mon' => $this->startTimeStamp_tm_mon,
            'tm_year' => $this->startTimeStamp_tm_year];

        $this->currentUtilHeader = (object) ['startTimestamp' => $this->startTimeStamp,
                    'numSamples' => $this->numSamples];
        
        $this->currentUtilization[] = (object) ['currentUtilHeader' => $this->currentUtilHeader,
            'currentUtilMeasurements' => (object) $this->currentUtilMeasurements];
        

        $this->data = (object) ['currentHeader' => $this->currentHeader,
                    'currentUtilization' => (object) $this->currentUtilization];

        $this->dataToSend = (object) ['customerID' => $baseObj->customerID,
                    'serialNum' => $baseObj->serialNum,
                    'defaultData' => $baseObj->defaultData,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
