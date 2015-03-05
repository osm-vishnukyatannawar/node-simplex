
<?php

require_once __DIR__. '/../config.php';

class Maintenance {

    public $dataToSend;
    public $data;
    public $type;
    public $currentTimeStamp;
    public $currentTimeStamp_tm_sec;
    public $currentTimeStamp_tm_min;
    public $currentTimeStamp_tm_hour;
    public $currentTimeStamp_tm_mday;
    public $currentTimeStamp_tm_mon;
    public $currentTimeStamp_tm_year;
    public $batteryInfo;
    public $batteryInfo_batteryLevelPercent;
    public $batteryInfo_predictedBatteryCapacity;
    public $batteryInfo_totalNumBatteryCharges;
    public $maintReason;
    public $powerPathUsageState;
    public $nearestAPMACAddr;
    public $nearestAPRSSIdBm;
    public $numBatteryCharges;
    public $numMotionDet;
    public $currentUtil;
    public $currentUtil_util5min;
    public $currentUtil_util1hr;
    public $currentUtil_util1day;
    public $currentUtil_util1week;
    public $currentUtil_util1month;
    public $currentUtil_util6months;
    public $batteryChargeTimestamp;
    public $batteryChargeTimestamp_tm_sec;
    public $batteryChargeTimestamp_tm_min;
    public $batteryChargeTimestamp_tm_hour;
    public $batteryChargeTimestamp_tm_mday;
    public $batteryChargeTimestamp_tm_mon;
    public $batteryChargeTimestamp_tm_year;
    public $motionDetStartTimestamp;
    public $motionDetStartTimestamp_tm_sec;
    public $motionDetStartTimestamp_tm_min;
    public $motionDetStartTimestamp_tm_hour;
    public $motionDetStartTimestamp_tm_mday;
    public $motionDetStartTimestamp_tm_mon;
    public $motionDetStartTimestamp_tm_year;
    public $chokePointInfo;
    public $numChokePointDet;
    public $chokepointType;
    public $timestamp_tm_sec;
    public $timestamp_tm_min;
    public $timestamp_tm_hour;
    public $timestamp_tm_mday;
    public $timestamp_tm_mon;
    public $timestamp_tm_year;
    public $timestamp;
    public $bleEvents;
    public $numBleConnect;
    public $bleConnectTimestamps;
    public $bleConnectTimestamps1;
    public $bleConnectTimestamps2;
    public $bleConnectTimestamps1_tm_sec;
    public $bleConnectTimestamps1_tm_min;
    public $bleConnectTimestamps1_tm_hour;
    public $bleConnectTimestamps1_tm_mday;
    public $bleConnectTimestamps1_tm_mon;
    public $bleConnectTimestamps1_tm_year;
    public $bleConnectTimestamps2_tm_sec;
    public $bleConnectTimestamps2_tm_min;
    public $bleConnectTimestamps2_tm_hour;
    public $bleConnectTimestamps2_tm_mday;
    public $bleConnectTimestamps2_tm_mon;
    public $bleConnectTimestamps2_tm_year;
    public $btPhoneMacAddr;
    public $numBleDevFind;

    public function __construct($dfltData) {
        $this->type = MAINTENANCE_TYPE;
        $this->currentTimeStamp_tm_sec = $dfltData;
        $this->currentTimeStamp_tm_min = $dfltData;
        $this->currentTimeStamp_tm_hour = $dfltData;
        $this->currentTimeStamp_tm_mday = $dfltData;
        $this->currentTimeStamp_tm_mon = $dfltData;
        $this->currentTimeStamp_tm_year = $dfltData;
        $this->batteryInfo_batteryLevelPercent = $dfltData;
        $this->batteryInfo_predictedBatteryCapacity = $dfltData;
        $this->batteryInfo_totalNumBatteryCharges = $dfltData;
        $this->maintReason = $dfltData;
        $this->powerPathUsageState = $dfltData;
        $this->nearestAPMACAddr = $dfltData;
        $this->nearestAPRSSIdBm = $dfltData;
        $this->numBatteryCharges = $dfltData;
        $this->numMotionDet = $dfltData;
        $this->currentUtil_util5min = $dfltData;
        $this->currentUtil_util1hr = $dfltData;
        $this->currentUtil_util1day = $dfltData;
        $this->currentUtil_util1week = $dfltData;
        $this->currentUtil_util1month = $dfltData;
        $this->currentUtil_util6months = $dfltData;
        $this->batteryChargeTimestamp_tm_sec = $dfltData;
        $this->batteryChargeTimestamp_tm_min = $dfltData;
        $this->batteryChargeTimestamp_tm_hour = $dfltData;
        $this->batteryChargeTimestamp_tm_mday = $dfltData;
        $this->batteryChargeTimestamp_tm_mon = $dfltData;
        $this->batteryChargeTimestamp_tm_year = $dfltData;
        $this->motionDetStartTimestamp_tm_sec = $dfltData;
        $this->motionDetStartTimestamp_tm_min = $dfltData;
        $this->motionDetStartTimestamp_tm_hour = $dfltData;
        $this->motionDetStartTimestamp_tm_mday = $dfltData;
        $this->motionDetStartTimestamp_tm_mon = $dfltData;
        $this->motionDetStartTimestamp_tm_year = $dfltData;
        $this->numChokePointDet = $dfltData;
        $this->chokepointType = $dfltData;
        $this->timestamp_tm_sec = $dfltData;
        $this->timestamp_tm_min = $dfltData;
        $this->timestamp_tm_hour = $dfltData;
        $this->timestamp_tm_mday = $dfltData;
        $this->timestamp_tm_mon = $dfltData;
        $this->timestamp_tm_year = $dfltData;
        $this->numBleConnect = $dfltData;
        $this->bleConnectTimestamps1_tm_sec = $dfltData;
        $this->bleConnectTimestamps1_tm_min = $dfltData;
        $this->bleConnectTimestamps1_tm_hour = $dfltData;
        $this->bleConnectTimestamps1_tm_mday = $dfltData;
        $this->bleConnectTimestamps1_tm_mon = $dfltData;
        $this->bleConnectTimestamps1_tm_year = $dfltData;
        $this->bleConnectTimestamps2_tm_sec = $dfltData;
        $this->bleConnectTimestamps2_tm_min = $dfltData;
        $this->bleConnectTimestamps2_tm_hour = $dfltData;
        $this->bleConnectTimestamps2_tm_mday = $dfltData;
        $this->bleConnectTimestamps2_tm_mon = $dfltData;
        $this->bleConnectTimestamps2_tm_year = $dfltData;
        $this->btPhoneMacAddr = [
            "Maintenance" . $dfltData,
            "Maintenance" . $dfltData
        ];
        $this->numBleDevFind = 1;
    }

    public function getMntceDataFormat($tagSN, $orgID, $dfltData) {

        $baseObj = new Base($tagSN, $orgID, $dfltData);

        $this->currentTimeStamp = (object) ['tm_sec' => $this->currentTimeStamp_tm_sec,
                    'tm_min' => $this->currentTimeStamp_tm_min,
                    'tm_hour' => $this->currentTimeStamp_tm_hour,
                    'tm_mday' => $this->currentTimeStamp_tm_mday,
                    'tm_mon' => $this->currentTimeStamp_tm_mon,
                    'tm_year' => $this->currentTimeStamp_tm_year];

        $this->batteryInfo = (object) ['batteryLevelPercent' => $this->batteryInfo_batteryLevelPercent,
                    'predictedBatteryCapacity' => $this->batteryInfo_predictedBatteryCapacity,
                    'totalNumBatteryCharges' => $this->batteryInfo_totalNumBatteryCharges];

        $this->currentUtil = (object) ['util5min' => $this->currentUtil_util5min,
                    'util1hr' => $this->currentUtil_util1hr,
                    'util1day' => $this->currentUtil_util1day,
                    'util1week' => $this->currentUtil_util1week,
                    'util1month' => $this->currentUtil_util1month,
                    'util6months' => $this->currentUtil_util6months];

        $this->batteryChargeTimestamp = (object) ['tm_sec' => $this->batteryChargeTimestamp_tm_sec,
                    'tm_min' => $this->batteryChargeTimestamp_tm_min,
                    'tm_hour' => $this->batteryChargeTimestamp_tm_hour,
                    'tm_mday' => $this->batteryChargeTimestamp_tm_mday,
                    'tm_mon' => $this->batteryChargeTimestamp_tm_mon,
                    'tm_year' => $this->batteryChargeTimestamp_tm_year];

        $this->motionDetStartTimestamp = (object) ['tm_sec' => $this->motionDetStartTimestamp_tm_sec,
                    'tm_min' => $this->motionDetStartTimestamp_tm_min,
                    'tm_hour' => $this->motionDetStartTimestamp_tm_hour,
                    'tm_mday' => $this->motionDetStartTimestamp_tm_mday,
                    'tm_mon' => $this->motionDetStartTimestamp_tm_mon,
                    'tm_year' => $this->motionDetStartTimestamp_tm_year];

        $this->timestamp = (object) ['tm_sec' => $this->timestamp_tm_sec,
                    'tm_min' => $this->timestamp_tm_min,
                    'tm_hour' => $this->timestamp_tm_hour,
                    'tm_mday' => $this->timestamp_tm_mday,
                    'tm_mon' => $this->timestamp_tm_mon,
                    'tm_year' => $this->timestamp_tm_year];

        $this->bleConnectTimestamps1 = (object) ['tm_sec' => $this->bleConnectTimestamps1_tm_sec,
                    'tm_min' => $this->bleConnectTimestamps1_tm_min,
                    'tm_hour' => $this->bleConnectTimestamps1_tm_hour,
                    'tm_mday' => $this->bleConnectTimestamps1_tm_mday,
                    'tm_mon' => $this->bleConnectTimestamps1_tm_mon,
                    'tm_year' => $this->bleConnectTimestamps1_tm_year];

        $this->bleConnectTimestamps2 = (object) ['tm_sec' => $this->bleConnectTimestamps2_tm_sec,
                    'tm_min' => $this->bleConnectTimestamps2_tm_min,
                    'tm_hour' => $this->bleConnectTimestamps2_tm_hour,
                    'tm_mday' => $this->bleConnectTimestamps2_tm_mday,
                    'tm_mon' => $this->bleConnectTimestamps2_tm_mon,
                    'tm_year' => $this->bleConnectTimestamps2_tm_year];

        $this->chokePointInfo = (object) ['numChokePointDet' => $this->numChokePointDet,
                    'chokepointType' => $this->chokepointType,
                    'timestamp' => $this->timestamp];

        $this->bleConnectTimestamps = [$this->bleConnectTimestamps1, $this->bleConnectTimestamps2];

        $this->bleEvents = (object) ['numBleConnect' => $this->numBleConnect,
                    'bleConnectTimestamps' => $this->bleConnectTimestamps,
                    'btPhoneMacAddr' => $this->btPhoneMacAddr,
                    'numBleDevFind' => $this->numBleDevFind];

        $this->data = (object) ['currentTimeStamp' => $this->currentTimeStamp,
                    'batteryInfo' => $this->batteryInfo,
                    'maintReason' => $this->maintReason,
                    'powerPathUsageState' => $this->powerPathUsageState,
                    'nearestAPMACAddr' => $this->nearestAPMACAddr,
                    'nearestAPRSSIdBm' => $this->nearestAPRSSIdBm,
                    'numBatteryCharges' => $this->numBatteryCharges,
                    'numMotionDet' => $this->numMotionDet,
                    'currentUtil' => $this->currentUtil,
                    'batteryChargeTimestamp' => $this->batteryChargeTimestamp,
                    'motionDetStartTimestamp' => $this->motionDetStartTimestamp,
                    'chokePointInfo' => $this->chokePointInfo,
                    'bleEvents' => $this->bleEvents];

        $this->dataToSend = (object) ['customerID' => $baseObj->customerID,
                    'serialNum' => $baseObj->serialNum,
                    'defaultData' => $baseObj->defaultData,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}