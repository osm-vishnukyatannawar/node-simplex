<?php

require_once __DIR__. '/../config.php';

class Histogram {

    public $dataToSend;
    public $data;
    public $type;
    public $startTimeStamp;
    public $startTimeStamp_tm_sec;
    public $startTimeStamp_tm_min;
    public $startTimeStamp_tm_hour;
    public $startTimeStamp_tm_mday;
    public $startTimeStamp_tm_mon;
    public $startTimeStamp_tm_year;
    public $histData;

    public function __construct($dfltData) {

        $this->type = HISTOGRAM_TYPE;
        $this->startTimeStamp_tm_sec = $dfltData;
        $this->startTimeStamp_tm_min = $dfltData;
        $this->startTimeStamp_tm_hour = $dfltData;
        $this->startTimeStamp_tm_mday = $dfltData;
        $this->startTimeStamp_tm_mon = $dfltData;
        $this->startTimeStamp_tm_year = $dfltData;
        $this->histData = 'Histogram'.$dfltData;
    }

    public function getHistogramDataFormat($tagSN, $orgID, $dfltData) {
        
        $baseObj = new Base($tagSN, $orgID, $dfltData);

        $this->startTimeStamp = (object) ['tm_sec' => $this->startTimeStamp_tm_sec,
                    'tm_min' => $this->startTimeStamp_tm_min,
                    'tm_hour' => $this->startTimeStamp_tm_hour,
                    'tm_mday' => $this->startTimeStamp_tm_sec,
                    'tm_mon' => $this->startTimeStamp_tm_mon,
                    'tm_year' => $this->startTimeStamp_tm_year,];

        $this->data = (object) ['startTimeStamp' => $this->startTimeStamp,
                    'histData' => $this->histData];

        $this->dataToSend = (object) ['customerID' => $baseObj->customerID,
                    'serialNum' => $baseObj->serialNum,
                    'defaultData' => $baseObj->defaultData,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
