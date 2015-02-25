<?php
//ini_set('error_reporting', 1);
set_time_limit(0);
require_once 'config.php';
require_once 'ws-call.php';
?>
<!DOCTYPE HTML>
<html>
    <head>
        <title>
            Emanate Emulator
        </title>
        <style> 
            h1, h2, h3, h4 {
                margin-bottom: 0.5em;
                margin-top:0.5em;
            }
            .form-right, .form-left {
                width:49%;                
            }
            .form-right {
                float:right;
            }
            .form-left {
                float:left;
            }
            .clear-div {
                clear:both;
            }
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
            .footer {
                min-height: 10px;
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
        <?php
        $tagSN = empty($_POST['tagSN']) ? TAG_SN : intval($_POST['tagSN']);
        $orgID = empty($_POST['orgID']) ? ORG_ID : intval($_POST['orgID']);
        $dfltData = empty($_POST['dfltData']) ? DEFAULT_VALUES : intval($_POST['dfltData']);
        $wifiFirmware = empty($_POST['wifiFirmware']) ? DEFAULT_VALUES : $_POST['wifiFirmware'];
        $bleFirmware = empty($_POST['bleFirmware']) ? DEFAULT_VALUES : $_POST['bleFirmware'];
        $hostFirmware = empty($_POST['hostFirmware']) ? DEFAULT_VALUES : $_POST['hostFirmware'];
        $tagUSDData = empty($_POST['tagUSDData']) ? 'default data = ' . DEFAULT_VALUES : $_POST['tagUSDData'];
        $tagDebugLog = empty($_POST['tagDebugLog']) ? 'Log == ' . DEFAULT_VALUES : $_POST['tagDebugLog'];
        ?>
        <form method ="POST" enctype="multipart/form-data">
            <div class="form-left">                
                <h2>Tag Info</h2>
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
<!--                            <td><?php // echo DEFAULT_VALUES ?></td>-->
                            <td><input class="pure-text" type='text' value="<?php echo $dfltData ?>" name="dfltData"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="form-right">
                <h2>Tag firmware info</h2>
                <table class="zebra">
                    <thead>
                        <tr>
                            <td>Version type</td>
                            <td>Version value</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>WIFI firmware version</td>
                            <td><input class="pure-text" type='text' value="<?php echo $wifiFirmware ?>" name="wifiFirmware"></td>
                        </tr>
                        <tr>
                            <td>BLE firmware version</td>
                            <td><input class="pure-text" type='text' value="<?php echo $bleFirmware ?>" name="bleFirmware"></td>
                        </tr>
                        <tr>
                            <td>Host firmware version</td>
                            <td><input class="pure-text" type='text' value="<?php echo $hostFirmware ?>" name="hostFirmware"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="clear-div"></div>
            <hr>
            <h2>Tag Debug info</h2>
            <table class="zebra">
                <thead>
                </thead>
                <tbody>
                    <tr>
                        <td>Tag USD debug data</td>
                        <td><textarea class="pure-text" name="tagUSDData"><?php echo $tagUSDData ?></textarea></td>
                    </tr>
                    <tr>
                        <td>Tag debug log</td>
                        <td><textarea class="pure-text" name="tagDebugLog"><?php echo $tagDebugLog ?></textarea></td>
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
        <hr>
        <div class = "footer"></div>
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
            $type = $_POST['dataType'];
            $nmbrOfCalls = intval($_POST['callsNmber']);
            $firmwareLookupIds = unserialize(LOOKUP_VALUES);
            if ($nmbrOfCalls > 0) {
                for ($i = 1; $i <= $nmbrOfCalls; ++$i) {
                    $respObj = sendDataBasedOnDataType($type);
                    // If it's a maintenance type process the pending events                    
                    if (intval($type) === MAINTENANCE_TYPE) {
                        processTagPendingEvents($respObj->data);
                    }
                }
            } else {
                $respObj = sendDataBasedOnDataType($type);
                if (intval($type) === MAINTENANCE_TYPE) {
                    processTagPendingEvents($respObj->data);
                }
            }
        }
        ?>
        <h2>Event Info</h2>
<pre>
    MAINTENANCE_TYPE -  1
    TAGINFO_TYPE -  5
    HISTOGRAM_TYPE -  2
    CURRENT_TYPE -  4
    PIM_TYPE -  3
    POWERPATH_SEND_DEBUG_LOG -  9
    POWERPATH_REPORT_USD_DEBUG_DATA - 16
</pre>
        <hr>
        <?php if (!empty($allOutput)) { ?>
            <h2>Output</h2>
            <?php
            $i = 1;
            foreach ($allOutput as $output) {
                if(empty($output)) {
                    continue;
                }
                ?>
                <ul class="output-list">
                    <li><strong>#<?php echo $i ?></strong>
                        <hr>
                    <li><strong>HTTP</strong> : <?php echo $output->statusCode ?></li>
                    <li><strong>URL</strong> : <?php echo $output->urlCalled ?></li>
                    <li><strong>Call Type</strong> : <?php echo $output->callType ?></li>
                    <li><strong>Status</strong> : <?php echo $output->status ?></li>
                    <li><strong>Data</strong> : <pre><?php echo json_encode($output->data, JSON_PRETTY_PRINT) ?></pre></li>
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
