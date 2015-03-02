<?php
require_once 'config.php';

class Base {
    
    public $customerID;
    public $serialNum;
    public $defaultData;
    
    
    public function __construct($tagSN, $orgID, $dfltData) {        
        $this->customerID = $orgID;
        $this->serialNum = $tagSN;
        $this->defaultData = $dfltData;
    }   
}

