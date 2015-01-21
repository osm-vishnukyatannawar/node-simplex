<?php
require_once 'config.php';

class Histogram {
    
    public $dataToSend;
    public $data;
    public $orgID;
    public $type;
    public $SN;
    public $startTimeStamp;
    public $startTimeStamp_tm_sec;
    public $startTimeStamp_tm_min;
    public $startTimeStamp_tm_hour;
    public $startTimeStamp_tm_mday;
    public $startTimeStamp_tm_mon;
    public $startTimeStamp_tm_year;
    public $histData;
    
    public function __construct() {
        
        $this->orgID = '3';
        $this->SN = '3';
        $this->type = HISTOGRAM_TYPE;
        $this->startTimeStamp_tm_sec = 10;
        $this->startTimeStamp_tm_min = 18;
        $this->startTimeStamp_tm_hour = 10;
        $this->startTimeStamp_tm_mday = 10;
        $this->startTimeStamp_tm_mon = 10;
        $this->startTimeStamp_tm_year = 2014;
        $this->histData = '12,203,345';
        
    }

    public function getHistogramDataFormat() {
        
        $this->startTimeStamp = (object) ['tm_sec' => $this->startTimeStamp_tm_sec,
            'tm_min' => $this->startTimeStamp_tm_min,
            'tm_hour' => $this->startTimeStamp_tm_hour,
            'tm_mday' => $this->startTimeStamp_tm_sec,
            'tm_mon' => $this->startTimeStamp_tm_mon,
            'tm_year' => $this->startTimeStamp_tm_year,];
        
        $this->data = (object) ['startTimeStamp' => $this->startTimeStamp,
            'histData' => $this->histData];
        
        $this->dataToSend = (object) ['orgID' => $this->orgID,
            'SN' => $this->SN,
            'type' => $this->type,
            'data' => $this->data];
        
        return $this->dataToSend;
    }
}
