<?php
require_once 'config.php';

class TagInfo {
    
    public $dataToSend;
    public $data;
    public $orgID;
    public $serialNum;
    public $type;
    public $deviceID;
    public $customerID;
    public $hardwareVersion;
    public $wifiMacAddr;
    public $tagConfigState;
    public $hwPeripherals;
    public $hostFirmwareVer;
    public $wifiFirmwareVer;
    public $bleFirwareVer;
    public $powerPathConfigVer;
    public $factoryTestTime;
    public $factoryTestTime_tm_sec;
    public $factoryTestTime_tm_min;
    public $factoryTestTime_tm_hour;
    public $factoryTestTime_tm_mday;
    public $factoryTestTime_tm_mon;
    public $factoryTestTime_tm_year;
    public $configTime;
    public $configTime_tm_sec;
    public $configTime_tm_min;
    public $configTime_tm_hour;
    public $configTime_tm_mday;
    public $configTime_tm_mon;
    public $configTime_tm_year;
    
    public function __construct() {
        
        $this->orgID = '3';
        $this->serialNum = '3';
        $this->type = TAGINFO_TYPE;
        $this->deviceID = 676767676;
        $this->customerID = 787878789;
        $this->hardwareVersion = 'a1';
        $this->wifiMacAddr = '12:34:23:45:34:28';
        $this->tagConfigState = 2;
        $this->hwPeripherals = 'a';
        $this->hostFirmwareVer = 'ab';
        $this->wifiFirmwareVer = 'a1';
        $this->bleFirwareVer = '12';
        $this->powerPathConfigVer = '23';
        $this->factoryTestTime_tm_sec = 10;
        $this->factoryTestTime_tm_min = 12;
        $this->factoryTestTime_tm_hour = 17;
        $this->factoryTestTime_tm_mday = 8;
        $this->factoryTestTime_tm_mon = 10;
        $this->factoryTestTime_tm_year = 2014;
        $this->configTime_tm_sec = 20;
        $this->configTime_tm_min = 12;
        $this->configTime_tm_hour = 8;
        $this->configTime_tm_mday = 21;
        $this->configTime_tm_mon = 4;
        $this->configTime_tm_year = 2014;
        
    }

    public function getTagInfoDataFormat() {
        
        $this->factoryTestTime = (object) ['tm_sec' => $this->factoryTestTime_tm_sec,
            'tm_min' => $this->factoryTestTime_tm_min,
            'tm_hour' => $this->factoryTestTime_tm_hour,
            'tm_mday' => $this->factoryTestTime_tm_mday,
            'tm_mon' => $this->factoryTestTime_tm_mon,
            'tm_year' => $this->factoryTestTime_tm_year];
        
        $this->configTime = (object) ['tm_sec' => $this->configTime_tm_sec,
            'tm_min' => $this->configTime_tm_min,
            'tm_hour' => $this->configTime_tm_hour,
            'tm_mday' => $this->configTime_tm_mday,
            'tm_mon' => $this->configTime_tm_mon,
            'tm_year' => $this->configTime_tm_year];
        
        $this->data = (object) ['deviceID' => $this->deviceID,
            'customerID' => $this->customerID,
            'hardwareVersion' => $this->hardwareVersion,
            'wifiMacAddr' => $this->wifiMacAddr,
            'tagConfigState' => $this->tagConfigState,
            'hwPeripherals' => $this->hwPeripherals,
            'hostFirmwareVer' => $this->hostFirmwareVer,
            'wifiFirmwareVer' => $this->wifiFirmwareVer,
            'bleFirwareVer' => $this->bleFirwareVer,
            'powerPathConfigVer' => $this->powerPathConfigVer,
            'factoryTestTime' => $this->factoryTestTime,
            'configTime' => $this->configTime];
        
        $this->dataToSend = (object) ['orgID' => $this->orgID,
            'serialNum' => $this->serialNum,
            'type' => $this->type,
            'data' => $this->data];
        
        return $this->dataToSend;
    }
}
    

