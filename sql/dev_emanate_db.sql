CREATE DATABASE  IF NOT EXISTS `dev_emanate_db` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `dev_emanate_db`;
-- MySQL dump 10.16  Distrib 10.1.1-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: dev_emanate_db
-- ------------------------------------------------------
-- Server version	10.1.1-MariaDB-1~wheezy-wsrep-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `license_m`
--

DROP TABLE IF EXISTS `license_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `license_m` (
  `license_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `license_name` varchar(100) DEFAULT NULL,
  `max_tags` int(8) DEFAULT NULL,
  `max_users` int(4) DEFAULT NULL,
  `max_deployments` int(2) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`license_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license_m`
--

LOCK TABLES `license_m` WRITE;
/*!40000 ALTER TABLE `license_m` DISABLE KEYS */;
INSERT INTO `license_m` VALUES ('cd224237-668b-11e4-945d-000c29609978','License1',1000,10,5,'Details of License 1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd224311-668b-11e4-945d-000c29609978','License2',2000,20,10,'Details of License 2',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2243a2-668b-11e4-945d-000c29609978','License3',4000,40,20,'Details of License 3',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `license_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_m`
--

DROP TABLE IF EXISTS `organization_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization_m` (
  `organization_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `organization_id` varchar(32) DEFAULT NULL,
  `organization_name` varchar(100) DEFAULT NULL,
  `license_recid` varchar(36) NOT NULL,
  `country_recid` varchar(36) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `organization_url` varchar(100) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`organization_recid`),
  UNIQUE KEY `country_recid` (`country_recid`,`license_recid`,`organization_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_m`
--

LOCK TABLES `organization_m` WRITE;
/*!40000 ALTER TABLE `organization_m` DISABLE KEYS */;
INSERT INTO `organization_m` VALUES ('cd28276d-668b-11e4-945d-000c29609978','1','Organization1','cd224237-668b-11e4-945d-000c29609978','cd2276db-668b-11e4-945d-000c29609978','1234567890','Address 1','http://emanate.emanatewireless.com','Details of Organization1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2af504-668b-11e4-945d-000c29609978','1','Organization2','cd224237-668b-11e4-945d-000c29609978','cd2276db-668b-11e4-945d-000c29609978','1234567890','Address 1','http://emanate.emanatewireless.com','Details of Organization1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2af796-668b-11e4-945d-000c29609978','1','Organization3','cd224237-668b-11e4-945d-000c29609978','cd2276db-668b-11e4-945d-000c29609978','1234567890','Address 1','http://emanate.emanatewireless.com','Details of Organization1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2af88a-668b-11e4-945d-000c29609978','1','Organization4','cd224311-668b-11e4-945d-000c29609978','cd227f0c-668b-11e4-945d-000c29609978','1234567890','Address 1','http://emanate.emanatewireless.com','Details of Organization1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2af9c9-668b-11e4-945d-000c29609978','1','Organization5','cd224311-668b-11e4-945d-000c29609978','cd227f0c-668b-11e4-945d-000c29609978','1234567890','Address 1','http://emanate.emanatewireless.com','Details of Organization1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `organization_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_m`
--

DROP TABLE IF EXISTS `role_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_m` (
  `role_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `role_id` varchar(50) DEFAULT NULL,
  `role_name` varchar(50) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_recid`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_m`
--

LOCK TABLES `role_m` WRITE;
/*!40000 ALTER TABLE `role_m` DISABLE KEYS */;
INSERT INTO `role_m` VALUES ('cd1dbb0d-668b-11e4-945d-000c29609978','1','Read only','Read only',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd1dbddf-668b-11e4-945d-000c29609978','1','Full','Full',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `role_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_m`
--

DROP TABLE IF EXISTS `country_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_m` (
  `country_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `country_name` varchar(50) DEFAULT NULL,
  `voltage_level` int(3) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`country_recid`),
  UNIQUE KEY `country_name` (`country_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country_m`
--

LOCK TABLES `country_m` WRITE;
/*!40000 ALTER TABLE `country_m` DISABLE KEYS */;
INSERT INTO `country_m` VALUES ('cd2276db-668b-11e4-945d-000c29609978','United States',120,'Country details of United States',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd227f0c-668b-11e4-945d-000c29609978','Canada',120,'Country details of Canada',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `country_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `deployment_m`
--

DROP TABLE IF EXISTS `deployment_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `deployment_m` (
  `deployment_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `deployment_name` varchar(100) DEFAULT NULL,
  `organization_recid` varchar(36) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`deployment_recid`),
  UNIQUE KEY `organization_recid` (`organization_recid`,`deployment_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deployment_m`
--

LOCK TABLES `deployment_m` WRITE;
/*!40000 ALTER TABLE `deployment_m` DISABLE KEYS */;
INSERT INTO `deployment_m` VALUES ('cd2c1313-668b-11e4-945d-000c29609978','Deployment1','cd28276d-668b-11e4-945d-000c29609978','Details of Deployment1',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2c16cb-668b-11e4-945d-000c29609978','Deployment2','cd28276d-668b-11e4-945d-000c29609978','Details of Deployment2',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2c17f9-668b-11e4-945d-000c29609978','Deployment3','cd28276d-668b-11e4-945d-000c29609978','Details of Deployment3',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2c18a9-668b-11e4-945d-000c29609978','Deployment4','cd2af504-668b-11e4-945d-000c29609978','Details of Deployment4',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2c19b0-668b-11e4-945d-000c29609978','Deployment5','cd2af504-668b-11e4-945d-000c29609978','Details of Deployment5',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `deployment_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_m`
--

DROP TABLE IF EXISTS `user_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_m` (
  `user_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `user_name` varchar(100) DEFAULT NULL,
  `user_password` varchar(100) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `user_timezone` varchar(100) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_m`
--

LOCK TABLES `user_m` WRITE;
/*!40000 ALTER TABLE `user_m` DISABLE KEYS */;
INSERT INTO `user_m` VALUES ('cd20af29-668b-11e4-945d-000c29609978','Emanate','Emanate','1234567890','Emanate@Emanate.com','America/New_York','Emanate user',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd20b5f4-668b-11e4-945d-000c29609978','Public','Public','1234567890','Public@Public.com','America/New_York','Public user',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd21cab9-668b-11e4-945d-000c29609978','IOS Passkey','IOS Passkey','1234567890','IOSPasskey@Emanate.com','America/New_York','IOS Passkey user',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `user_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_det`
--

DROP TABLE IF EXISTS `user_role_det`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_det` (
  `user_role_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `user_recid` varchar(36) NOT NULL,
  `deployment_recid` varchar(36) NOT NULL,
  `role_recid` varchar(36) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_role_recid`),
  UNIQUE KEY `user_recid` (`user_recid`,`deployment_recid`,`role_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_det`
--

LOCK TABLES `user_role_det` WRITE;
/*!40000 ALTER TABLE `user_role_det` DISABLE KEYS */;
INSERT INTO `user_role_det` VALUES ('cd2d0c73-668b-11e4-945d-000c29609978','cd20af29-668b-11e4-945d-000c29609978','cd2c1313-668b-11e4-945d-000c29609978','cd1dbddf-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d11ff-668b-11e4-945d-000c29609978','cd20b5f4-668b-11e4-945d-000c29609978','cd2c1313-668b-11e4-945d-000c29609978','cd1dbb0d-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d1340-668b-11e4-945d-000c29609978','cd20af29-668b-11e4-945d-000c29609978','cd2c16cb-668b-11e4-945d-000c29609978','cd1dbddf-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d1404-668b-11e4-945d-000c29609978','cd20b5f4-668b-11e4-945d-000c29609978','cd2c16cb-668b-11e4-945d-000c29609978','cd1dbb0d-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d14d2-668b-11e4-945d-000c29609978','cd20af29-668b-11e4-945d-000c29609978','cd2c18a9-668b-11e4-945d-000c29609978','cd1dbddf-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d15a2-668b-11e4-945d-000c29609978','cd20b5f4-668b-11e4-945d-000c29609978','cd2c18a9-668b-11e4-945d-000c29609978','cd1dbb0d-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d1651-668b-11e4-945d-000c29609978','cd20af29-668b-11e4-945d-000c29609978','cd2c19b0-668b-11e4-945d-000c29609978','cd1dbddf-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('cd2d2833-668b-11e4-945d-000c29609978','cd20b5f4-668b-11e4-945d-000c29609978','cd2c19b0-668b-11e4-945d-000c29609978','cd1dbb0d-668b-11e4-945d-000c29609978','Details of user, Deployment and role mapping',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `user_role_det` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-11-09 11:00:22
