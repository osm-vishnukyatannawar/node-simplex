<?php
require_once 'config.php';
require_once 'response.php';

$curlRes = array();

function getCurlObj($url) {
    global $curlRes;            
    if(!empty($curlRes[$url])) {
        return $curlRes[$url];
    }        
    $curlRes[$url] = curl_init($url);
    return $curlRes[$url];
}

function makeCallToMaintURL($dataToSend, $url) {
    $reqUrl = empty($url) ? WS_URL : $url;
    $ch = getCurlObj($reqUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToSend);
    curl_setopt($ch, CURLOPT_TIMEOUT, 45);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
        'Content-Length: ' . strlen($dataToSend))
    );
    sleep(SLEEP_TIME);
    $resultObj = curl_exec($ch);
    return parseResponse($ch, $resultObj);
}

function makeGETRequest($url) {
    $ch = getCurlObj($url);
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
    if(!empty($url)) {
        $destination = 'Files/bleWifiHost_'.microtime(true).'.bin';
        $data = file_get_contents($url);
        $handle = fopen($destination, "w");
        fwrite($handle, $data);
        fclose($handle);
        return true;
    }
    return false;
}

function parseResponse($ch, $resultObj) {    
    try {
        $respObj = new Response();
        $respObj->statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $resultObj = json_decode($resultObj);
        $respObj->status = $resultObj->status;
        $respObj->data = $resultObj->data;
        if (!empty($resultObj->message)) {
            $respObj->message = $resultObj->message;
        }
    } catch (Exception $ex) {
        $respObj->status = 'Error';
        $respObj->status = 'There was an error while parsing the data.';
    }
    return $respObj;
}