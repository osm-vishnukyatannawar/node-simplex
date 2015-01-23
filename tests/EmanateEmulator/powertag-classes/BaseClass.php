<?php
require_once 'config.php';

class Base {
    
    public $customerID;
    public $serialNum;
    
    
    public function __construct() {
        
        $this->customerID = ORG_ID;
        $this->serialNum = TAG_SN;
        
    }
    
}

