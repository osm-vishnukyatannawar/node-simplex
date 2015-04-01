<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class slogerr {
    
    function slogerr($dataSent , $responseObj , $url){
       
        $slogerObj = $this->getSlogerObj($dataSent, $responseObj, $url);
        $this->logToSloger($slogerObj);
    }
    
    private function getSlogerObj($dataSent , $responseObj, $url){
        
       
        $logMsgObj = new stdClass();
        $logMsgObj->dataSent = $dataSent;
        $obj = json_decode($dataSent);
        $logMsgObj->response = $responseObj;
        $string = json_encode($logMsgObj);
        $string = str_replace('\\', ' ', $string);
        $dataToSend = array(
            "LogMessage"=> 'Tag serial number : '.$obj->serialNum.' Type : '.$obj->type,
            "StackTrace"=> $string,
            "User"=> "Osmosys",
            "Customer"=> "Osmosys",
            "PageOrModuleName"=> $responseObj->status,
            "Application"=> SLOGERR_APP_ID,
            "Subscription"=> null,
            "Reserve1"=> null,
            "Reserve2"=>null,
            "Reserve3"=>null,
            "Reserve4"=>null,
            "LogType"=> 0,
            "Severity"=> 1
         );
        return $dataToSend;
     }
    
    private function logToSloger($data){
         $ch = curl_init(trim(SLOGERR_URL));
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1); 
        $serverResponse = curl_exec($ch);
        curl_close($ch);  
    }
    
    
}
