<?php ini_set('error_reporting', 1); ?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>
            Maintenance Call
        </title>
    </head>
    <body>
        <script type="text/javascript">
              function changeDataType(value) {
                  document.getElementById('txtDataType').value = value;
              }
        </script>
        <form method ="POST" enctype="multipart/form-data">
            <input type="text" value = "" name="callsNmber" placeholder="Number of calls">
            <input type="hidden" name="dataType" placeholder="Type" id = "txtDataType" value ="1">
            <button type="submit" onclick="changeDataType(this.value)" value="1">Maintenance</button>
            <button type="submit" onclick="changeDataType(this.value)" value="2">Histogram</button>
            <button type="submit" onclick="changeDataType(this.value)" value="3">PIM</button>
            <button type="submit" onclick="changeDataType(this.value)" value="4">Current</button>
            <button type="submit" onclick="changeDataType(this.value)" value="5">TagInfo</button>
            <input type="submit" name="submit">
        </form>

    </body>
</html>

<?php
require_once 'BaseClass.php';
require_once 'MaintenanceClass.php';
require_once 'TagInfoClass.php';
require_once 'HistorgramClass.php';
require_once 'CurrentClass.php';
require_once 'PIMClass.php';

if (isset($_POST['submit'])) {

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

    function sendRequiredData($dataToSend) {
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
    
    function sendDataBasedOnDataType($dataType) {
        switch ($dataType) {
               case 1 : $finalResult = sendRequiredData($mntnceData);
                   break;
               case 2 : $finalResult = sendRequiredData($histogramData);
                   break;
               case 3 : $finalResult = sendRequiredData($pimData);
                   break;
               case 4 : $finalResult = sendRequiredData($currentData);
                   break;
               case 5 : $finalResult = sendRequiredData($tagInfoData);
                   break;
        }
    }
    
    $type = $_POST['dataType'];
    echo $type;

    if($nmbrOfCalls > 0) {
        for ($i = 1; $i <= $nmbrOfCalls; ++$i) {
            $finalResult = sendDataBasedOnDataType($type);
            foreach ($finalResult['data'] AS $key => $value) {
               sendDataBasedOnDataType($key);
            }
        }
    } else {
        $finalResult = sendDataBasedOnDataType($type);
        foreach ($finalResult['data'] AS $key => $value) {
           sendDataBasedOnDataType($key);
        }
    }
}

