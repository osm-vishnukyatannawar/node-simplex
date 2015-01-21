<?php ini_set('error_reporting', 1); ?>

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

require_once 'MaintenanceClass.php';
require_once 'TagInfoClass.php';
require_once 'HistorgramClass.php';
require_once 'CurrentClass.php';
require_once 'PIMClass.php';

if(isset($_POST['submit'])) {
    
    $mainObj = new Maintenance();
    $mntnceData = json_encode($mainObj->getMntceDataFormat());
    
    $tagObj = new TagInfo();
    $tagInfoData = json_encode($tagObj->getTagInfoDataFormat());
    
    $histogramObj = new Histogram();
    $histogramData = json_encode($histogramObj->getHistogramDataFormat());
    
    $currentObj = new Current();
    $currentData = json_encode($currentObj->getCurrentDataFormat());
    
    $pimObj = new PIM();
    $pimData = json_encode($pimObj->getPIMDataFormat());

//    echo $mntnceData;
//    echo "<br/>";
//    echo $tagInfoData;
//    echo "<br/>";
//    echo $histogramData;
//    echo "<br/>";
//    echo $currentData;
//    echo "<br/>";
//    echo $pimData;                                                                                                                                                                                      

    $nmbrOfCalls = $_POST['callsNmber'];
    
    function setRequiredData($dataToSend) {
        $ch = curl_init('http://10.0.0.15:3000/api/v1/tag/maintenance/');                                                                      
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                                                                                      
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToSend); 
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(                                                                          
            'Content-Type: application/json',                                                                                
            'Content-Length: ' . strlen($dataToSend))                                                                       
        );
        sleep(0.75);
        $result = curl_exec($ch);
        $result = json_decode($result, true);
        return $result;
    }
    
    $finalResult = setRequiredData($mntnceData);
    
    for($i = 1; $i <=  $nmbrOfCalls; ++$i) {
        foreach($finalResult['data'] AS  $key=>$value) {
            switch($key) {
                case '1' : $finalResult = setRequiredData($mntnceData);
                           break;
                case '2' : $finalResult = setRequiredData($histogramData);
                           break;
                case '3' : $finalResult = setRequiredData($pimData);
                           break;
                case '4' : $finalResult = setRequiredData($currentData);
                           break;
                case '5' : $finalResult = setRequiredData($tagInfoData);
                           break;
            }
        }
    }  
}

