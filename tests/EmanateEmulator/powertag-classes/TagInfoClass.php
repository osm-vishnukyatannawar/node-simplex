<?php

require_once __DIR__. '/../config.php';

class TagInfo {

    public $dataToSend;
    public $data;
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

        $this->type = TAGINFO_TYPE;
        $this->deviceID = DEFAULT_VALUES;
        $this->hardwareVersion = 'Tag - '.DEFAULT_VALUES;
        $this->wifiMacAddr = 'Tag - '.DEFAULT_VALUES;
        $this->tagConfigState = DEFAULT_VALUES;
        $this->hwPeripherals = 'Tag - '.DEFAULT_VALUES;
        $this->hostFirmwareVer = 'Tag - '.DEFAULT_VALUES;
        $this->wifiFirmwareVer = 'Tag - '.DEFAULT_VALUES;
        $this->bleFirwareVer = 'Tag - '.DEFAULT_VALUES;
        $this->powerPathConfigVer = 'Tag - '.DEFAULT_VALUES;
        $this->factoryTestTime_tm_sec = DEFAULT_VALUES;
        $this->factoryTestTime_tm_min = DEFAULT_VALUES;
        $this->factoryTestTime_tm_hour = DEFAULT_VALUES;
        $this->factoryTestTime_tm_mday = DEFAULT_VALUES;
        $this->factoryTestTime_tm_mon = DEFAULT_VALUES;
        $this->factoryTestTime_tm_year = DEFAULT_VALUES;
        $this->configTime_tm_sec = DEFAULT_VALUES;
        $this->configTime_tm_min = DEFAULT_VALUES;
        $this->configTime_tm_hour = DEFAULT_VALUES;
        $this->configTime_tm_mday = DEFAULT_VALUES;
        $this->configTime_tm_mon = DEFAULT_VALUES;
        $this->configTime_tm_year = DEFAULT_VALUES;
    }

    public function getTagInfoDataFormat($tagSN, $orgID) {

        $baseObj = new Base($tagSN, $orgID);
        
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
                    'customerID' => $baseObj->customerID,
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

        $this->dataToSend = (object) ['customerID' => $baseObj->customerID,
                    'serialNum' => $baseObj->serialNum,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
