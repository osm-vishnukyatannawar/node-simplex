<?php
require_once 'config.php';

class Base {
    
    public $customerID;
    public $serialNum;
    
    
    public function __construct($tagSN, $orgID) {        
        $this->customerID = $orgID;
        $this->serialNum = $tagSN;        
    }   
}

