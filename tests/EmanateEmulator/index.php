<?php
//ini_set('error_reporting', 1);
set_time_limit(0);
require_once 'config.php'
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>
            Emanate Emulator
        </title>
        <style>
            table {
                *border-collapse: collapse; /* IE7 and lower */
                border-spacing: 0;
                width: 100%;    
            }
            .zebra td, .zebra th {
                padding: 10px;
                border-bottom: 1px solid #f2f2f2;    
            }

            .zebra tbody tr:nth-child(even) {
                background: #f5f5f5;
                -webkit-box-shadow: 0 1px 0 rgba(255,255,255,.8) inset; 
                -moz-box-shadow:0 1px 0 rgba(255,255,255,.8) inset;  
                box-shadow: 0 1px 0 rgba(255,255,255,.8) inset;        
            }

            .zebra th {
                text-align: left;
                text-shadow: 0 1px 0 rgba(255,255,255,.5); 
                border-bottom: 1px solid #ccc;
                background-color: #eee;
                background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#eee));
                background-image: -webkit-linear-gradient(top, #f5f5f5, #eee);
                background-image:    -moz-linear-gradient(top, #f5f5f5, #eee);
                background-image:     -ms-linear-gradient(top, #f5f5f5, #eee);
                background-image:      -o-linear-gradient(top, #f5f5f5, #eee); 
                background-image:         linear-gradient(top, #f5f5f5, #eee);
            }

            .zebra th:first-child {
                -moz-border-radius: 6px 0 0 0;
                -webkit-border-radius: 6px 0 0 0;
                border-radius: 6px 0 0 0;  
            }

            .zebra th:last-child {
                -moz-border-radius: 0 6px 0 0;
                -webkit-border-radius: 0 6px 0 0;
                border-radius: 0 6px 0 0;
            }

            .zebra th:only-child{
                -moz-border-radius: 6px 6px 0 0;
                -webkit-border-radius: 6px 6px 0 0;
                border-radius: 6px 6px 0 0;
            }

            .zebra tfoot td {
                border-bottom: 0;
                border-top: 1px solid #fff;
                background-color: #f1f1f1;  
            }

            .zebra tfoot td:first-child {
                -moz-border-radius: 0 0 0 6px;
                -webkit-border-radius: 0 0 0 6px;
                border-radius: 0 0 0 6px;
            }

            .zebra tfoot td:last-child {
                -moz-border-radius: 0 0 6px 0;
                -webkit-border-radius: 0 0 6px 0;
                border-radius: 0 0 6px 0;
            }

            .zebra tfoot td:only-child{
                -moz-border-radius: 0 0 6px 6px;
                -webkit-border-radius: 0 0 6px 6px;
                border-radius: 0 0 6px 6px;
            }
            .output-list {
                padding:0.5em;
                background-color:#d3d3d3;
                margin-bottom: 1em;
                border-radius:5px;
                font-family:'Consolas','monospace';
                font-size: 13px;
            }
            .output-list li {
                list-style: none;
            }
            body {
                font-family : Arial, Helvetica, sans-serif
            }
            .pure-button {
                font-family: inherit;
                font-size: 13px;
                padding: .3em .7em;
                color: #444;
                color: rgba(0,0,0,.8);
                border: 1px solid #999;                
                background-color: #E6E6E6;
                text-decoration: none;
                border-radius: 2px;
                cursor: pointer;
            }
            .pure-button:hover{
                background-color: #d1d1d1;
            }
            .pure-text {
                padding: .4em .5em;
                display: inline-block;
                border: 1px solid #ccc;
                box-shadow: inset 0 1px 3px #ddd;
                border-radius: 4px;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
        </style>
    </head>
    <body>
        <script type="text/javascript">
            function changeDataType(value) {
              document.getElementById('hdnDataType').value = value;
            }
        </script>
        <h1>Emanate Simulator</h1>
        <hr>
        <h2>Tag Info</h2>
        <?php
        $tagSN = empty($_POST['tagSN']) || empty(intval($_POST['tagSN'])) ? TAG_SN : intval($_POST['tagSN']);
        $orgID = empty($_POST['orgID']) || empty(intval($_POST['orgID'])) ? ORG_ID : intval($_POST['orgID']);
        ?>
        <form method ="POST" enctype="multipart/form-data">
            <table class="zebra">
                <thead>
                    <tr>
                        <td>Property</td>
                        <td>Value</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Tag Serial Number</td>
                        <td><input class="pure-text" type='text' value="<?php echo $tagSN ?>" name="tagSN"></td>
                    </tr>
                    <tr>
                        <td>Organization ID</td>
                        <td><input class="pure-text" type='text' value="<?php echo $orgID ?>" name="orgID"></td>
                    </tr>
                    <tr>
                        <td>Default Data</td>
                        <td><?php echo DEFAULT_VALUES ?></td>
                    </tr>
                </tbody>
            </table>
            <hr>
            <h2>Communicator</h2>        
            <input class="pure-text" type="text" value = "1" name="callsNmber" placeholder="Number of calls">
            <input type="hidden" name="dataType" placeholder="Type" id = "hdnDataType" value ="1">
            <button class="pure-button" type="submit" name="submit" onclick="changeDataType(this.value)" value="1">Maintenance</button>
            <button class="pure-button"  type="submit" name="submit" onclick="changeDataType(this.value)" value="2">Histogram</button>
            <button class="pure-button"  type="submit" name="submit" onclick="changeDataType(this.value)" value="3">PIM</button>
            <button class="pure-button"  type="submit" name="submit" onclick="changeDataType(this.value)" value="4">Current</button>
            <button class="pure-button"  type="submit" name="submit" onclick="changeDataType(this.value)" value="5">TagInfo</button>            
        </form>
        <?php
        require_once 'powertag-classes/BaseClass.php';
        require_once 'powertag-classes/MaintenanceClass.php';
        require_once 'powertag-classes/TagInfoClass.php';
        require_once 'powertag-classes/HistorgramClass.php';
        require_once 'powertag-classes/CurrentClass.php';
        require_once 'powertag-classes/PIMClass.php';
        require_once 'response.php';

        $allOutput = array();
        if (isset($_POST['submit'])) {
            $ch = curl_init('http://localhost:3000/api/v1/tag/maintenance/');

            function sendRequiredData($dataToSend) {
                global $ch;
                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $dataToSend);
                curl_setopt($ch, CURLOPT_TIMEOUT, 45);
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json',
                    'Content-Length: ' . strlen($dataToSend))
                );
                sleep(1);
                $resultObj = curl_exec($ch);
                $respObj = new Response();
                $respObj->statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                try {
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

            function sendDataBasedOnDataType($dataType) {
                global $tagSN, $orgID;
                switch ($dataType) {
                    case MAINTENANCE_TYPE :
                        $mainObj = new Maintenance();
                        $mntnceData = json_encode($mainObj->getMntceDataFormat($tagSN, $orgID));
                        $finalResult = sendRequiredData($mntnceData);
                        break;
                    case HISTOGRAM_TYPE :
                        $histogramObj = new Histogram();
                        $histogramData = json_encode($histogramObj->getHistogramDataFormat());
                        $finalResult = sendRequiredData($histogramData);
                        break;
                    case PIM_TYPE :
                        $pimObj = new PIM();
                        $pimData = json_encode($pimObj->getPIMDataFormat());
                        $finalResult = sendRequiredData($pimData);
                        break;
                    case CURRENT_TYPE :
                        $currentObj = new Current();
                        $currentData = json_encode($currentObj->getCurrentDataFormat());
                        $finalResult = sendRequiredData($currentData);
                        break;
                    case TAGINFO_TYPE :
                        $tagObj = new TagInfo();
                        $tagInfoData = json_encode($tagObj->getTagInfoDataFormat());
                        $finalResult = sendRequiredData($tagInfoData);
                        break;
                }
                global $allOutput;
                $allOutput[] = $finalResult;
                return $finalResult;
            }

            $type = $_POST['dataType'];
            $nmbrOfCalls = intval($_POST['callsNmber']);
            if ($nmbrOfCalls > 0) {
                for ($i = 1; $i <= $nmbrOfCalls; ++$i) {
                    $respObj = sendDataBasedOnDataType($type);
                    // If it's a maintenance type process the pending events                    
                    if (intval($type) === MAINTENANCE_TYPE) {
                        if (!empty($respObj->data)) {
                            foreach ($respObj->data AS $key => $value) {
                                sendDataBasedOnDataType(intval($key));
                            }
                        }
                    }
                }
            } else {
                $finalResult = sendDataBasedOnDataType($type);
                foreach ($finalResult['data'] AS $key => $value) {
                    sendDataBasedOnDataType($key);
                }
            }
        }
        ?>
        <?php if (!empty($allOutput)) { ?>
            <h2>Output</h2>
            <?php
            $i = 1;
            foreach ($allOutput as $output) {
                ?>
                <ul class="output-list">
                    <li><strong>#<?php echo $i ?></strong>
                        <hr>
                    <li><strong>HTTP</strong> : <?php echo $output->statusCode ?></li>
                    <li><strong>Status</strong> : <?php echo $output->status ?></li>
                    <li><strong>Data</strong> : <?php echo json_encode($output->data) ?></li>
                    <?php if (!empty($output->message)) { ?>
                        <li><strong>Message</strong> : <?php echo $output->message ?></li>
                    <?php } ?>
                </ul>                
                <?php
                ++$i;
            }
            ?>
<?php } ?>
    </body>
</html>
