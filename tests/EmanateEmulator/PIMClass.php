<?php

require_once 'config.php';

class PIM {

    public $dataToSend;
    public $data;
    public $customerID;
    public $serialNum;
    public $type;
    public $PimHeader;
    public $currentTimeStamp;
    public $currentTimeStamp_tm_sec;
    public $currentTimeStamp_tm_min;
    public $currentTimeStamp_tm_hour;
    public $currentTimeStamp_tm_mday;
    public $currentTimeStamp_tm_mon;
    public $currentTimeStamp_tm_year;
    public $numACPlugins;
    public $numPimBlocks;
    public $numSamplesInBlock;
    public $PimData;
    public $PimData1;
    public $PimData2;
    public $PlugInTimeStamp1;
    public $PlugInTimeStamp2;
    public $PimData1_trig;
    public $PimData1_plugInTimeStamp_tm_sec;
    public $PimData1_plugInTimeStamp_tm_min;
    public $PimData1_plugInTimeStamp_tm_hour;
    public $PimData1_plugInTimeStamp_tm_mday;
    public $PimData1_plugInTimeStamp_tm_mon;
    public $PimData1_plugInTimeStamp_tm_year;
    public $PimData1_plugInDur_min;
    public $PimData1_plugInToMeasDelay_msec;
    public $PimData1_rmsCurrent;
    public $PimData1_peakToRms;
    public $PimData1_stdDev;
    public $PimData2_trig;
    public $PimData2_plugInTimeStamp_tm_sec;
    public $PimData2_plugInTimeStamp_tm_min;
    public $PimData2_plugInTimeStamp_tm_hour;
    public $PimData2_plugInTimeStamp_tm_mday;
    public $PimData2_plugInTimeStamp_tm_mon;
    public $PimData2_plugInTimeStamp_tm_year;
    public $PimData2_plugInDur_min;
    public $PimData2_plugInToMeasDelay_msec;
    public $PimData2_rmsCurrent;
    public $PimData2_peakToRms;
    public $PimData2_stdDev;

    public function __construct() {

        $this->orgID = '3';
        $this->SN = '3';
        $this->type = PIM_TYPE;
        $this->currentTimeStamp_tm_sec = 12;
        $this->currentTimeStamp_tm_min = 10;
        $this->currentTimeStamp_tm_hour = 2;
        $this->currentTimeStamp_tm_mday = 12;
        $this->currentTimeStamp_tm_mon = 1;
        $this->currentTimeStamp_tm_year = 2014;
        $this->numACPlugins = 53;
        $this->numPimBlocks = 62;
        $this->numSamplesInBlock = 68;
        $this->PimData1_trig = 2;
        $this->PimData1_plugInTimeStamp_tm_sec = 12;
        $this->PimData1_plugInTimeStamp_tm_min = 10;
        $this->PimData1_plugInTimeStamp_tm_hour = 2;
        $this->PimData1_plugInTimeStamp_tm_mday = 12;
        $this->PimData1_plugInTimeStamp_tm_mon = 1;
        $this->PimData1_plugInTimeStamp_tm_year = 2014;
        $this->PimData1_plugInDur_min = 280;
        $this->PimData1_plugInToMeasDelay_msec = 53792;
        $this->PimData1_rmsCurrent = 53794;
        $this->PimData1_peakToRms = 796;
        $this->PimData1_stdDev = 536;
        $this->PimData2_trig = 1;
        $this->PimData2_plugInTimeStamp_tm_sec = 20;
        $this->PimData2_plugInTimeStamp_tm_min = 10;
        $this->PimData2_plugInTimeStamp_tm_hour = 12;
        $this->PimData2_plugInTimeStamp_tm_mday = 1;
        $this->PimData2_plugInTimeStamp_tm_mon = 10;
        $this->PimData2_plugInTimeStamp_tm_year = 2014;
        $this->PimData2_plugInDur_min = 240;
        $this->PimData2_plugInToMeasDelay_msec = 32792;
        $this->PimData2_rmsCurrent = 23794;
        $this->PimData2_peakToRms = 45768;
        $this->PimData2_stdDev = 798;
    }

    public function getPIMDataFormat() {

        $this->PlugInTimeStamp1 = (object) ['tm_sec' => $this->PimData1_plugInTimeStamp_tm_sec,
                    'tm_min' => $this->PimData1_plugInTimeStamp_tm_min,
                    'tm_hour' => $this->PimData1_plugInTimeStamp_tm_hour,
                    'tm_mday' => $this->PimData1_plugInTimeStamp_tm_mday,
                    'tm_mon' => $this->PimData1_plugInTimeStamp_tm_mon,
                    'tm_year' => $this->PimData1_plugInTimeStamp_tm_year];

        $this->PlugInTimeStamp2 = (object) ['tm_sec' => $this->PimData2_plugInTimeStamp_tm_sec,
                    'tm_min' => $this->PimData2_plugInTimeStamp_tm_min,
                    'tm_hour' => $this->PimData2_plugInTimeStamp_tm_hour,
                    'tm_mday' => $this->PimData2_plugInTimeStamp_tm_mday,
                    'tm_mon' => $this->PimData2_plugInTimeStamp_tm_mon,
                    'tm_year' => $this->PimData2_plugInTimeStamp_tm_year];

        $this->PimData1 = (object) ['trig' => $this->PimData1_trig,
                    'plugInTimeStamp' => $this->PlugInTimeStamp1,
                    'plugInDur_min' => $this->PimData1_plugInDur_min,
                    'plugInToMeasDelay_msec' => $this->PimData1_plugInToMeasDelay_msec,
                    'rmsCurrent' => $this->PimData1_rmsCurrent,
                    'peakToRms' => $this->PimData1_peakToRms,
                    'stdDev' => $this->PimData1_stdDev];

        $this->PimData2 = (object) ['trig' => $this->PimData2_trig,
                    'plugInTimeStamp' => $this->PlugInTimeStamp2,
                    'plugInDur_min' => $this->PimData2_plugInDur_min,
                    'plugInToMeasDelay_msec' => $this->PimData2_plugInToMeasDelay_msec,
                    'rmsCurrent' => $this->PimData2_rmsCurrent,
                    'peakToRms' => $this->PimData2_peakToRms,
                    'stdDev' => $this->PimData2_stdDev];

        $this->PimData = [$this->PimData1, $this->PimData2];

        $this->currentTimeStamp = (object) ['tm_sec' => $this->currentTimeStamp_tm_sec,
                    'tm_min' => $this->currentTimeStamp_tm_min,
                    'tm_hour' => $this->currentTimeStamp_tm_hour,
                    'tm_mday' => $this->currentTimeStamp_tm_mday,
                    'tm_mon' => $this->currentTimeStamp_tm_mon,
                    'tm_year' => $this->currentTimeStamp_tm_year];

        $this->PimHeader = (object) ['currentTimeStamp' => $this->currentTimeStamp,
                    'numACPlugins' => $this->numACPlugins,
                    'numPimBlocks' => $this->numPimBlocks,
                    'numSamplesInBlock' => $this->numSamplesInBlock];

        $this->data = (object) ['PimHeader' => $this->PimHeader,
                    'PimData' => $this->PimData];

        $this->dataToSend = (object) ['orgID' => $this->orgID,
                    'SN' => $this->SN,
                    'type' => $this->type,
                    'data' => $this->data];

        return $this->dataToSend;
    }

}
