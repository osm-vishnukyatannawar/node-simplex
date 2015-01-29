<?php

require_once 'config.php';

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

    public function __construct() {

        $this->type = HISTOGRAM_TYPE;
        $this->startTimeStamp_tm_sec = DEFAULT_VALUES;
        $this->startTimeStamp_tm_min = DEFAULT_VALUES;
        $this->startTimeStamp_tm_hour = DEFAULT_VALUES;
        $this->startTimeStamp_tm_mday = DEFAULT_VALUES;
        $this->startTimeStamp_tm_mon = DEFAULT_VALUES;
        $this->startTimeStamp_tm_year = DEFAULT_VALUES;
        $this->histData = 'Histogram'.DEFAULT_VALUES;
    }

    public function getHistogramDataFormat() {
        
        $baseObj = new Base();

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
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
