<?php
//error_reporting (E_ALL);
//ini_set('display_errors',1);
require_once 'config.php';
require_once 'response.php';
/**
 * Classes for fetching the json data format for the tag post calls.
 */
require_once 'powertag-classes/BaseClass.php';
require_once 'powertag-classes/MaintenanceClass.php';
require_once 'powertag-classes/TagInfoClass.php';
require_once 'powertag-classes/HistorgramClass.php';
require_once 'powertag-classes/CurrentClass.php';
require_once 'powertag-classes/PIMClass.php';
require_once 'powertag-classes/USDDebug.php';
require_once 'powertag-classes/DebugLog.php';


$curlRes = array();

function getCurlObj($url) {
    global $curlRes;
    if (!empty($curlRes[$url])) {
        return $curlRes[$url];
    }
    $curlRes[$url] = curl_init($url);
    return $curlRes[$url];
}

function makeCallToMaintURL($dataToSend, $url) {
    $reqUrl = empty($url) ? WS_URL : $url;
    $ch = getCurlObj(trim($reqUrl));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToSend);
    curl_setopt($ch, CURLOPT_TIMEOUT, 45);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($dataToSend))
    );
    sleep(SLEEP_TIME);
    $startTime = timeCalculation();
    $resultObj = curl_exec($ch);
    $endTime   = timeCalculation();
    $totalTimeTaken = round(($endTime - $startTime), 4);
    return parseResponse($ch, $resultObj, $totalTimeTaken);
}

function makeGETRequest($url) {
    $ch = getCurlObj(trim($url));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 45);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json'
    ));
    sleep(SLEEP_TIME);
    $resultObj = curl_exec($ch);
    return parseResponse($ch, $resultObj);
}

function downloadFirmware($url) {
    if (!empty($url)) {
        $destination = 'Files/bleWifiHost_' . microtime(true) . '.bin';
        $data = file_get_contents($url);
        $handle = fopen($destination, "w");
        fwrite($handle, $data);
        fclose($handle);
        return true;
    }
    return false;
}

function parseResponse($ch, $resultObj, $totalTimeTaken = NULL) {
    $respObj = new Response();    
    if(empty($resultObj)) {
        $respObj->status = 'Error';
        $respObj->status = 'No data was returned from the WS..';
        $respObj->timeTaken = $totalTimeTaken;
        return $respObj;
    }
    try {        
        $respObj->statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $resultObj = json_decode($resultObj);
        $respObj->status = $resultObj->status;
        $respObj->data = $resultObj->data;
        $respObj->timeTaken = $totalTimeTaken;
        if (!empty($resultObj->message)) {
            $respObj->message = $resultObj->message;
        }
    } catch (Exception $ex) {
        $respObj->status = 'Error';
        $respObj->status = 'There was an error while parsing the data.';
        $respObj->timeTaken = $totalTimeTaken;
    }
    return $respObj;
}
/**
 * Sends data to the server ($url) based on the $dataType paramter and the
 * @global type $tagSN - Tag serial number
 * @global type $orgID - Organization ID
 * @global type $dfltData - Tag default data
 * @global type $wifiFirmware - WIFI Firmware
 * @global type $bleFirmware - BLE Firmware
 * @global type $hostFirmware - Host Firmware
 * @global array $allOutput - Keeps track of the output from each call.
 * @param type $dataType - Type of the data.
 * @param type $url - URL of the server to call.
 * @return type object
 */
function sendDataBasedOnDataType($dataType, $url = NULL) {
    global $tagSN, $orgID, $dfltData, $wifiFirmware, $bleFirmware, $hostFirmware, $tagUSDData, $tagDebugLog, $tagHistogramData,
            $macAddress;
    $finalResult = false;    
    switch ($dataType) {
        case MAINTENANCE_TYPE :
            $mainObj = new Maintenance($dfltData);
            $mainObj->batteryInfo_batteryLevelPercent = rand(100, 10000) / 100;
            $mntnceData = json_encode($mainObj->getMntceDataFormat($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($mntnceData, $url);
            break;
        case HISTOGRAM_TYPE :
            $histogramObj = new Histogram($dfltData);
            $histogramObj->histData = $tagHistogramData;
            $histogramData = json_encode($histogramObj->getHistogramDataFormat($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($histogramData, $url);
            break;
        case PIM_TYPE :
            $pimObj = new PIM($dfltData);
            $pimData = json_encode($pimObj->getPIMDataFormat($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($pimData, $url);
            break;
        case CURRENT_TYPE :
            $currentObj = new Current($dfltData);
            $currentData = json_encode($currentObj->getCurrentDataFormat($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($currentData, $url);
            break;
        case TAGINFO_TYPE :
            $tagObj = new TagInfo($dfltData);
            $tagObj->wifiFirmwareVer = $wifiFirmware;
            $tagObj->bleFirwareVer = $bleFirmware;
            $tagObj->hostFirmwareVer = $hostFirmware;
            $tagObj->hardwareVersion = $hostFirmware;
            $tagObj->wifiMacAddr = $macAddress;
            $tagObj->wifiMacAddr = $macAddress;
            $tagInfoData = json_encode($tagObj->getTagInfoDataFormat($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($tagInfoData, $url);
            break;
        case POWERPATH_UPDATE_CONFIG_PARAM :
            $finalResult = makeGETRequest($url);
            break;
        case POWERPATH_SEND_DEBUG_LOG :
            $debugLogObj = new DebugLog($dfltData);
            $debugLogObj->log = $tagDebugLog;
            $debugLogData = json_encode($debugLogObj->getDebugLog($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($debugLogData, $url);
            break;
        case POWERPATH_REPORT_USD_DEBUG_DATA:
            $usdDebugObj = new USDDebug($dfltData);
            $usdDebugObj->data = $tagUSDData;
            $usdDebugData = json_encode($usdDebugObj->getUsdDebugData($tagSN, $orgID, $dfltData));
            $finalResult = makeCallToMaintURL($usdDebugData, $url);            
            break;
    }    
    if ($finalResult) {
        $finalResult->callType = $dataType;
        $finalResult->urlCalled = $url;
        global $allOutput;
        $allOutput[] = $finalResult;
    }
    return $finalResult;
}

function processTagPendingEvents($data) {
    global $firmwareLookupIds;
    if (!empty($data)) {
        foreach ($data AS $key => $value) {
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                if (in_array($key, $firmwareLookupIds)) {
                    downloadFirmware($value);
                } else {
                    sendDataBasedOnDataType(intval($key), $value);
                }
            }
        }
    }
}
/**
 * To start timer
 * @return type
 */
function timeCalculation(){
    try {
        $time = microtime();
        $time = explode(' ', $time);
        $time = $time[1] + $time[0];
        return $time;
    } catch (Exception $exc) {
        //echo $exc->getTraceAsString();
    }
}


function getTagSerialNumbers($seriesStart , $seriesCount){
     $lstNumbers = $seriesStart;
     $series = array();
     $numbersFound = 0;
    for ($cnt = $lstNumbers; $cnt <= 9999999999; ++$cnt) {
        $rem1 = $cnt % 16;
        $quo1 = 0;
    if($rem1 === 2) {  
        $quo1 = intval($cnt / 16);
        if($quo1 % 16 === 4) {
           
            $byteSwaped = byteSwap($cnt);
            if(strlen($byteSwaped) === 10){
               array_push($series , $byteSwaped); 
                ++$numbersFound;
            }
            
            //$series.push(cnt);
            if($numbersFound === $seriesCount) {
                break;
            }
        }
    }   
}
return $series;
}

function byteSwap($number){
    $binaryVal = decbin($number);
    $binaryVal32 = str_pad($binaryVal, 32, '0', STR_PAD_LEFT);
    $splitArray = str_split($binaryVal32, 8);
    if (count($splitArray) !== 4) {
        continue;
    }
    $firstByte = $splitArray[0];
    $thirdByte = $splitArray[2];
    $splitArray[0] = $thirdByte;
    $splitArray[2] = $firstByte;
    $finalStr = implode('', $splitArray);
    $finalSN = bindec($finalStr);
    return $finalSN;
}