<!DOCTYPE HTML PUBLIC>
<html>
    <head>
        <title>
            Maintenance Call
        </title>
    </head>
    <body>
        <form method ="POST" enctype="multipart/form-data">
            <input type="text" value = "" name="callsNmber">
            <input type ="submit" name="submit">
        </form>

    </body>
</html>

<?php

require_once 'curlClass.php';

if(isset($_POST['submit'])) {
    
    $mainObj = new maintenance();

    $mainObj->customerID = '3';
    $mainObj->serialNum = '3';
    $mainObj->type = 1;
    $mainObj->currentTimeStamp_tm_sec = 12;
    $mainObj->currentTimeStamp_tm_min = 10;
    $mainObj->currentTimeStamp_tm_hour = 2;
    $mainObj->currentTimeStamp_tm_mday = 12;
    $mainObj->currentTimeStamp_tm_mon = 1;
    $mainObj->currentTimeStamp_tm_year = 2014;
    $mainObj->batteryInfo_batteryLevelPercent = 100;
    $mainObj->batteryInfo_predictedBatteryCapacity = 100;
    $mainObj->batteryInfo_totalNumBatteryCharges = 43690;
    $mainObj->maintReason = 1;
    $mainObj->powerPathUsageState = 1;
    $mainObj->nearestAPMACAddr = 0;
    $mainObj->nearestAPRSSIdBm = 0;
    $mainObj->numBatteryCharges = 0;
    $mainObj->numMotionDet = 12;
    $mainObj->currentUtil_util5min = 1;
    $mainObj->currentUtil_util1hr = 12; 
    $mainObj->currentUtil_util1day = 24; 
    $mainObj->currentUtil_util1week = 140; 
    $mainObj->currentUtil_util1month = 1200; 
    $mainObj->currentUtil_util6months = 1000; 
    $mainObj->batteryChargeTimestamp_tm_sec = 0;
    $mainObj->batteryChargeTimestamp_tm_min = 0;
    $mainObj->batteryChargeTimestamp_tm_hour = 10;
    $mainObj->batteryChargeTimestamp_tm_mday = 10;
    $mainObj->batteryChargeTimestamp_tm_mon = 10;
    $mainObj->batteryChargeTimestamp_tm_year = 2014;
    $mainObj->motionDetStartTimestamp_tm_sec = 12;
    $mainObj->motionDetStartTimestamp_tm_min = 12;
    $mainObj->motionDetStartTimestamp_tm_hour = 12;
    $mainObj->motionDetStartTimestamp_tm_mday = 11;
    $mainObj->motionDetStartTimestamp_tm_mon = 11;        
    $mainObj->motionDetStartTimestamp_tm_year = 2014;
    $mainObj->numChokePointDet = 1;
    $mainObj->chokepointType = 2;
    $mainObj->timestamp_tm_sec = 18;
    $mainObj->timestamp_tm_min = 0;
    $mainObj->timestamp_tm_hour = 12;
    $mainObj->timestamp_tm_mday = 12;
    $mainObj->timestamp_tm_mon = 6;
    $mainObj->timestamp_tm_year = 2013;
    $mainObj->numBleConnect = 12;
    $mainObj->bleConnectTimestamps1_tm_sec = 12;
    $mainObj->bleConnectTimestamps1_tm_min = 0;
    $mainObj->bleConnectTimestamps1_tm_hour = 12;
    $mainObj->bleConnectTimestamps1_tm_mday = 20;
    $mainObj->bleConnectTimestamps1_tm_mon = 5;
    $mainObj->bleConnectTimestamps1_tm_year = 2013;
    $mainObj->bleConnectTimestamps2_tm_sec = 45;
    $mainObj->bleConnectTimestamps2_tm_min = 6;
    $mainObj->bleConnectTimestamps2_tm_hour = 15;
    $mainObj->bleConnectTimestamps2_tm_mday = 12;
    $mainObj->bleConnectTimestamps2_tm_mon = 6;
    $mainObj->bleConnectTimestamps2_tm_year = 2014;
    $mainObj->btPhoneMacAddr = [
                    "101: 899: 102: 456: 234: 345",
                    "10: 010: 11: 333: 36: 119"
                ];
    $mainObj->numBleDevFind = 1;

    $data = $mainObj->getJsonDataFormat();
    echo json_encode($data);

    $dataToSend = json_encode($data);                                                                                   

    $ch = curl_init('http://10.0.0.15:3000/api/v1/tag/maintenance/');                                                                      
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToSend);                                                                  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
        'Content-Type: application/json',                                                                                
        'Content-Length: ' . strlen($dataToSend))                                                                       
    );                                                                                                                   

    $nmbrOfCalls = $_POST['callsNmber'];
    for($i = 1; $i <=  $nmbrOfCalls; ++$i) {
        sleep(0.75);
        $result = curl_exec($ch);
        echo $result;
    }  
}

