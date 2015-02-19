CREATE DATABASE  IF NOT EXISTS `dev_emanate_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dev_emanate_db`;
-- MySQL dump 10.15  Distrib 10.0.15-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 10.0.0.6    Database: dev_emanate_db
-- ------------------------------------------------------
-- Server version	10.0.15-MariaDB-1~trusty-log

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
-- Table structure for table `tag_report_logdata`
--

DROP TABLE IF EXISTS `tag_report_logdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_report_logdata` (
  `tag_report_logdata_recid` varchar(36) NOT NULL COMMENT 'uuid() unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL COMMENT 'references cassandra dump recid, for any backward verification',
  `tag_srno` varchar(100) DEFAULT NULL COMMENT 'References tag_info.tag_serial_num',
  `organization_id` varchar(32) DEFAULT NULL COMMENT 'References tag_info.organization_id',
  `curr_timestamp` datetime DEFAULT NULL,
  `system_events_id_enum` varchar(36) DEFAULT NULL COMMENT 'lookUp_table.Lookup_value_id where lookup_key=''powerpathsystemevents''',
  `report_logdata` int(8) unsigned DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_report_logdata_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='// This IS the response TO the command: POWERPATH_REPORT_LOG_EVENTS\n// the tag will report up TO N powerPathReportLogEvents_t IN an array\n// powerPathReportLogEvents_t *powerPathReportLogEvents;\n// the LOGS are collected IN the following FORMAT\n// [TIMESTAMP (64-BIT), EVENTS (8-BIT FIELD)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_report_logdata`
--

LOCK TABLES `tag_report_logdata` WRITE;
/*!40000 ALTER TABLE `tag_report_logdata` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_report_logdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_maint_call`
--

DROP TABLE IF EXISTS `tag_maint_call`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_maint_call` (
  `tag_maint_call_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL COMMENT 'References cassandra tag_data_dump table',
  `tag_srno` varchar(100) DEFAULT NULL COMMENT 'references tag_info.tag_serial_num',
  `organization_id` varchar(32) DEFAULT NULL COMMENT 'references tag_info.organization_id',
  `curr_timestamp` datetime DEFAULT NULL,
  `tag_maint_reason_id_enum` int(4) DEFAULT NULL COMMENT 'lookUp_table.Lookup_value_id where lookup_key = ''powerPathCCXMaintReason''',
  `tag_usage_info_id_enum` int(4) DEFAULT NULL COMMENT 'lookUp_table.Lookup_value_id where lookup_key = ''powerpathusageinfo''',
  `util_percent_5min` int(8) unsigned DEFAULT NULL,
  `util_percent_1hr` int(8) unsigned DEFAULT NULL,
  `util_percent_1day` int(8) unsigned DEFAULT NULL,
  `util_percent_1week` int(8) unsigned DEFAULT NULL,
  `util_percent_1month` int(8) unsigned DEFAULT NULL,
  `util_percent_6months` int(8) unsigned DEFAULT NULL,
  `nearest_ap_macaddr` varchar(50) DEFAULT NULL COMMENT '// wifi network info ex: 11:22:33:44:55:66',
  `nearest_ap_rssi_dbm` int(8) unsigned DEFAULT NULL COMMENT '// wifi network info nearest application(iphone) rssi',
  `battery_level_percent` int(8) unsigned DEFAULT NULL COMMENT '// 0 - 100 -- powerPathBatteryInfo_t',
  `predicted_battery_capacity` int(8) unsigned DEFAULT NULL COMMENT '// 0 - 100 -- powerPathBatteryInfo_t',
  `totalnum_battery_charges` int(16) unsigned DEFAULT NULL COMMENT '// Total number of battery charges -- powerPathBatteryInfo_t',
  `num_battery_charges` int(8) unsigned DEFAULT NULL COMMENT '// num battery charges since last maint interval',
  `battery_charge_timestamp` datetime DEFAULT NULL COMMENT '// more recent batteryCharge',
  `num_motion_det` int(8) unsigned DEFAULT NULL,
  `motion_det_start_timestamp` datetime DEFAULT NULL COMMENT ' // most recent',
  `num_chokepoint_det` int(8) unsigned DEFAULT NULL,
  `chokepoint_type` int(4) DEFAULT NULL COMMENT '// see powerPathHardwareOptions_t [MAX_POWERPATH_CHOKEPOINT_TIMESTAMPS] 4 powerPathTime_t\n                                  lookup_id from tag_lookup_table with lookup_key=''powerPathHardwareOptions''',
  `chokepoint_timestamp` datetime DEFAULT NULL COMMENT ' [MAX_POWERPATH_CHOKEPOINT_TIMESTAMPS] 4 powerPathTime_t',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_maint_call_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='// data to be dumped to server for every maintenance call\nold struct - Maintenance CALL messages – during maintenance calls which generally happen much\nold struct - LESS frequently THAN blink messages (e.g., once per DAY), the Tag periodically associates\nold struct - WITH the enterprise WiFi network TO CHECK FOR configuration AND firmware updates FROM\nold struct - AND upload POWER consumption, USD AND other information TO the SERVER\npowerPathMaint_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_maint_call`
--

LOCK TABLES `tag_maint_call` WRITE;
/*!40000 ALTER TABLE `tag_maint_call` DISABLE KEYS */;
INSERT INTO `tag_maint_call` VALUES ('07dbc32e-7c62-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:05:20',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:05:20',1,NULL,1,1,'2014-12-05 15:05:20','2014-12-05 12:17:39','Cassandra'),('08999b42-7c63-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:12:31',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:12:31',1,NULL,1,1,'2014-12-05 15:12:31','2014-12-05 12:17:39','Cassandra'),('0efa5541-df6c-4ca2-802b-9ed7cefc45e2','d64379a8-2359-4b3a-a7a5-74a7fe3d2309','3',NULL,'2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('170505b2-2adb-4255-9b1f-18e130d7ff34','1da97270-c33d-42be-9f3e-cf8eadc71726','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('1eae84da-8034-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:46:46',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:46:46',1,'2014-12-10 11:46:46',1,1,'2014-12-10 11:46:46','2014-12-10 11:46:46','Node JS'),('25931a26-8fb1-4d20-b849-6f9aafe72374','b5b72ee8-d337-4f8d-8c93-5e6cdc8f0530','3',NULL,'2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('26599592-d44d-4897-a04f-81beca675ea6','285225ed-f27e-4064-86c4-cb28a8f83f25','tag3-GE-10001','3','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('3d342ebb-7ed7-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-08 18:09:23',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-08 18:09:23',1,'2014-12-08 18:09:23',1,1,'2014-12-08 18:09:23','2014-12-08 17:58:41','Cassandra'),('3e43023b-8033-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:40:30',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:40:30',1,'2014-12-10 11:40:30',1,1,'2014-12-10 11:40:30',NULL,'Cassandra'),('4381c353-8033-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:40:39',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:40:39',1,'2014-12-10 11:40:39',1,1,'2014-12-10 11:40:39',NULL,'Cassandra'),('443cae4c-5701-4e62-ba1e-f6f6ddffff2a','1994455a-f895-47da-a3a6-2350d4a9fd90','3','13','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('448358e6-3d6b-43ab-a8bb-c9d54274fd38','d62e4337-e1c8-4675-a2b1-28f2141a8240','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('456a1ed0-8033-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:40:42',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:40:42',1,'2014-12-10 11:40:42',1,1,'2014-12-10 11:40:42',NULL,'Cassandra'),('58205e99-b358-4f04-b241-2adde0126adf','b65261a5-e1c5-4276-97f1-0e3475b82bc8','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-16 11:32:21','Node JS'),('5f195e49-4bb0-4e7b-835a-4fabd14a34df','cc0a6c00-2ef6-4ce9-94a6-56b4d9b6b5bd','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('6c771269-83fd-4cc3-a411-838aba28c1b8','0e636d3c-8f07-4b78-9e1b-e69f16deb4a1','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-15 12:54:21','Node JS'),('720d8259-7c61-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:01:09',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:01:09',1,NULL,1,1,'2014-12-05 15:01:09','2014-12-05 12:17:39','Cassandra'),('72d9af76-7580-40f2-a2db-5be34a276fc4','a614cd92-873f-45df-ae54-ab282ab08b60','3','13','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('759cc583-ee6d-4394-9e03-9ddcf05566cc','e813a156-d965-41a1-b14c-149e90067272','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('7cc50774-5ae8-49ec-8c1f-850a267011cd','1018e410-10a0-4208-ba48-588b77b46d6b','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-16 11:37:29','Node JS'),('7ed09327-39c9-4985-b2e7-f694f8998cc0','b20ca943-3552-45cb-be0f-c88b006ccd5e','3','13','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('83e9d15c-3020-4760-b26b-bbac8c651b67','9f03bf44-0712-4c0b-9210-f5d81d285d7b','13','3','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('8d9a8049-7c62-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:09:05',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:09:05',1,NULL,1,1,'2014-12-05 15:09:05','2014-12-05 12:17:39','Cassandra'),('8dbaf5d5-07c2-455d-8a0d-90c5cef565e9','189683c4-595d-457a-81dd-a2c8a4a5a8b9','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('8f3d1833-61e0-4d9d-8c21-bfe5369552b6','3a3820a0-e264-400d-8e90-d5104bbd71ee','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('9c3fedca-fcc4-4e69-a318-2990bfbe1d19','f9f03f0a-523f-47a2-b3d9-9fe02bd7d289','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-16 11:31:57','Node JS'),('a2a0ee3b-76bd-4c3e-b627-f92886b6b1d4','aaa4bb40-99f1-41a1-9bc0-912886cef283','3',NULL,'2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('a68f7a82-f53b-41b9-8e00-85e231fd3d9b','7d8e338c-f151-4a76-920f-498fa6568de0','3',NULL,'2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('aa9f4042-9711-4e1f-aa5c-b4117336508a','e7bb4729-4343-4789-aaf3-30592e691900','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('ade445c6-7c62-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:09:59',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:09:59',1,NULL,1,1,'2014-12-05 15:09:59','2014-12-05 12:17:39','Cassandra'),('ae6c8dac-8033-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:43:38',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:43:38',1,'2014-12-10 11:43:38',1,1,'2014-12-10 11:43:38',NULL,'Node JS'),('b2b82cc8-73d1-4e62-ba6f-8d320a588679','3a94b3db-a241-45d0-ba8b-94a8e0394c74','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('b6647381-6391-4f3b-8762-149f13b73baf','81b04424-8a73-4d8f-8c64-ef28b75e7eb4','3','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-19 13:49:58','Node JS'),('baf0c274-7d13-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-06 12:17:22',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-06 12:17:22',1,NULL,1,1,'2014-12-06 12:17:22',NULL,'Cassandra'),('bd4709a9-7c61-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:03:15',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:03:15',1,NULL,1,1,'2014-12-05 15:03:15','2014-12-05 12:17:39','Cassandra'),('c02ffed4-6de1-40c6-aef8-1cbeea05b158','95cbf996-f53f-4e5f-a87d-49c12e08a410','3','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-19 14:02:11','Node JS'),('c59294ca-7c62-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:10:39',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:10:39',1,NULL,1,1,'2014-12-05 15:10:39','2014-12-05 12:17:39','Cassandra'),('c5e59082-7a54-4433-bc17-25cc43d41982','2ff865d0-5012-4005-967c-1046d845ac0a','tag3-GE-10001','3','2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('d81cc398-86a5-43e1-912a-1013194c1bd6','ee7e6d6b-5e94-4149-a494-1a8d3510a385','3',NULL,'2014-02-11 20:40:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('db01ad09-1ea1-4f15-970b-b41eb6e3bc98','1d9fd51e-313d-404a-b2dd-d5afb0a54ccb','3','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','0000-00-00 00:00:00','Node JS'),('e53f7728-7c61-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:04:22',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:04:22',1,NULL,1,1,'2014-12-05 15:04:22','2014-12-05 12:17:39','Cassandra'),('e69fc55c-17b6-40c8-acab-04d839242304','cabcb059-6a69-4795-9309-b6b3ba0b6c2a','Tag-TI-2001','12','1901-02-12 06:42:12',1,1,1,12,24,140,1200,1000,'0',0,100,100,43690,0,'2014-11-10 04:30:00',12,'2014-12-11 06:42:12',1,2,'2013-07-12 06:30:18','2014-12-17 11:48:03','Node JS'),('e76c53be-8033-11e4-94af-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-10 11:45:14',1,1,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-10 11:45:14',1,'2014-12-10 11:45:14',1,1,'2014-12-10 11:45:14','2014-12-10 11:45:14','Node JS'),('eeea988a-7c62-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 15:11:48',NULL,NULL,NULL,1,1,1,1,1,'00:11:@2:33:44:55',60,70,70,70,4,'2014-12-05 15:11:48',1,NULL,1,1,'2014-12-05 15:11:48','2014-12-05 12:17:39','Cassandra');
/*!40000 ALTER TABLE `tag_maint_call` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `powerpath_tag_current_data`
--

DROP TABLE IF EXISTS `powerpath_tag_current_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `powerpath_tag_current_data` (
  `powerpath_tag_current_data_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `curr_timestamp` datetime DEFAULT NULL,
  `num_blocks` int(16) unsigned DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  PRIMARY KEY (`powerpath_tag_current_data_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is the response TO the command: POWERPATH_REPORT_CURRENT_UTIL_DATA with lookup_key = ''powerPathCmds''\n// numSamples * numBlocks <= maxCurrentSamples - powerPathTagCurrentData_t (C Structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `powerpath_tag_current_data`
--

LOCK TABLES `powerpath_tag_current_data` WRITE;
/*!40000 ALTER TABLE `powerpath_tag_current_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `powerpath_tag_current_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_m`
--

DROP TABLE IF EXISTS `token_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `token_m` (
  `token_recid` varchar(36) NOT NULL,
  `user_id` varchar(36) NOT NULL,
  `token_string` varchar(60) NOT NULL,
  `created_on` datetime NOT NULL,
  `expires_on` datetime NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`token_recid`),
  UNIQUE KEY `toekn_string_UNIQUE` (`token_string`),
  UNIQUE KEY `expires_on_UNIQUE` (`expires_on`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user_m` (`user_recid`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_m`
--

LOCK TABLES `token_m` WRITE;
/*!40000 ALTER TABLE `token_m` DISABLE KEYS */;
/*!40000 ALTER TABLE `token_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_pim_config`
--

DROP TABLE IF EXISTS `tag_pim_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_pim_config` (
  `tag_pim_config_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `pimconfig_enable` int(8) unsigned DEFAULT NULL,
  `tag_pim_trig_type_id_enum` int(4) DEFAULT NULL,
  `elapsed_time_10ms` int(16) unsigned DEFAULT NULL,
  `iir_filter_mhz` int(16) unsigned DEFAULT NULL,
  `rms_diff_thresh_ma` int(16) unsigned DEFAULT NULL,
  `trig_delay_10ms` int(16) unsigned DEFAULT NULL,
  `samp_rate_hz` int(16) unsigned DEFAULT NULL,
  `meas_dur_10ms` int(16) unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_pim_config_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='powerPathPIMConfig_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_pim_config`
--

LOCK TABLES `tag_pim_config` WRITE;
/*!40000 ALTER TABLE `tag_pim_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_pim_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_current_util_data`
--

DROP TABLE IF EXISTS `tag_current_util_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_current_util_data` (
  `tag_current_util_data_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `tag_current_data_recid` varchar(36) DEFAULT NULL,
  `current_rms` int(16) unsigned DEFAULT NULL,
  `util_val` int(8) unsigned DEFAULT NULL,
  `usage_state_id_enum` int(4) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tag_current_util_data_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is the response TO the command: POWERPATH_REPORT_CURRENT_UTIL_DATA with lookup_key = ''powerPathCmds''\ndata structure for current meas - powerPathCurrentUtilData_t (c structure)\n// array of numSamples powerPathCurrentUtilData_t *pData \ncalled in  powerpath_current_data table - powerPathCurrentData_t (C Structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_current_util_data`
--

LOCK TABLES `tag_current_util_data` WRITE;
/*!40000 ALTER TABLE `tag_current_util_data` DISABLE KEYS */;
INSERT INTO `tag_current_util_data` VALUES ('004b7c9e-51e3-4a05-b7fb-bdbc78204374','683dbc41-b67c-4275-96e9-74362adfc4a2',20,12,3,'2014-12-15 12:17:06','NodeJS'),('02add871-a28a-4717-8fab-0dbecbc01c1e','dfc81c83-1443-43f2-b172-d2e6a1ee347b',45,2,2,'2014-12-15 10:56:39','NodeJS'),('02fe4e08-e285-4336-8438-714f4b461d43','6a5f697c-8ced-4173-b95c-1f9b5b9d0b18',20,12,3,'2014-12-15 10:39:44','NodeJS'),('0f2a0def-15c4-4bc1-86dd-ca3c3a5a4b93','f1a055af-ef1f-4a2f-8d94-c17f4fffcca9',45,2,2,'2014-12-12 08:34:35','Node JS'),('0f449239-171e-4e1b-93b7-cd4bfeb90ca3','6c20631c-2a80-418e-84cc-43790a24335f',45,2,2,'2014-12-15 11:44:05','NodeJS'),('17a4825d-cbf5-40d3-992a-c33e059b9190','e5dca01e-a45c-4714-9d94-4671698e1284',20,12,3,'2014-12-15 11:41:36','NodeJS'),('18acf0d4-760e-4671-80b0-5acfad0524bb','d6130e57-9f3a-4d8d-8368-845fbe032d3e',45,2,2,'2014-12-15 06:13:21','NodeJS'),('19572414-77b5-11e4-94ec-e96d67bd7d3d','195723b5-77b5-11e4-94ec-e96d67bd7d3d',20,20,1,'2014-11-29 16:17:17',NULL),('1a7cb496-388a-4598-a21c-d5d2c9bf3033','6c8ea0c7-0f35-4627-bd4a-b8800d47d07b',20,12,3,'2014-12-15 12:16:50','NodeJS'),('218a4326-d7a3-40e1-939e-2dd9ce0c4ce1','9c1d8474-8b77-4d20-8812-8af623f1de81',20,12,3,'2014-12-16 11:37:59','NodeJS'),('2735b149-2dae-40a2-b122-2de3b4dadc8e','dc5d9054-75a7-4094-96cb-c616c0737b6b',45,2,2,'2014-12-15 10:28:06','NodeJS'),('2c08582b-9031-4bd1-b359-e422cfd60de7','e5dca01e-a45c-4714-9d94-4671698e1284',45,2,2,'2014-12-15 11:41:36','NodeJS'),('30e1281b-cc0b-43ff-a043-0dc47e2bd6c2','d6130e57-9f3a-4d8d-8368-845fbe032d3e',20,12,3,'2014-12-15 06:13:21','NodeJS'),('424e4099-1875-4847-841f-5072a59b93aa','76233673-5264-41dd-a954-ca72e9918c7d',45,2,2,'2014-12-12 09:22:48','NodeJS'),('42c10837-9370-42cb-ace0-10b688710f58','9e2ec9f7-672a-44df-8020-38f73ba97fa5',45,2,2,'2014-12-15 11:39:16','NodeJS'),('4808418e-77ba-11e4-94ec-e96d67bd7d3d','48084116-77ba-11e4-94ec-e96d67bd7d3d',20,20,1,'2014-11-29 16:54:22',NULL),('4ac3400b-7c45-11e4-8b2c-000c29609978','4ac33e6f-7c45-11e4-8b2c-000c29609978',10,10,1,'2014-12-05 11:39:37',NULL),('4d79d806-a3bd-4974-9812-ca9308bd5505','539a598f-5afd-4ba7-8f36-812bd6f89cda',20,12,3,'2014-12-15 10:52:31','NodeJS'),('50397fa4-60c0-481d-b450-3e76f4bf8dfb','3c6f9957-a350-4e68-8eab-22c20ae68704',20,12,3,'2014-12-15 10:46:02','NodeJS'),('514d4e98-e686-4ca0-b5cf-ab16ebbc2f26','60bd1af8-d43f-4b01-8202-4598c1c6422f',45,2,2,'2014-12-15 10:51:13','NodeJS'),('54fd9fcf-77b5-11e4-94ec-e96d67bd7d3d','54fd9f6c-77b5-11e4-94ec-e96d67bd7d3d',20,20,1,'2014-11-29 16:18:57',NULL),('57180e78-2fef-4026-a63d-06a380638093','dc5d9054-75a7-4094-96cb-c616c0737b6b',20,12,3,'2014-12-15 10:28:06','NodeJS'),('5770a55d-8da6-429b-b73e-f6843b00f81e','dfc81c83-1443-43f2-b172-d2e6a1ee347b',20,12,3,'2014-12-15 10:56:39','NodeJS'),('57797d02-deb0-4405-895c-c80ed81be270','3112c288-7a7a-421c-86d3-4d87268cfe6f',20,12,3,'2014-12-15 11:39:43','NodeJS'),('5cc3fbc3-586c-4881-ba92-e771202da85a','6c20631c-2a80-418e-84cc-43790a24335f',20,12,3,'2014-12-15 11:44:05','NodeJS'),('62260afa-bf22-4793-912f-73bb0269548f','8a6d4cbe-47f5-4dfd-87c7-27951364bd69',45,2,2,'2014-12-15 10:31:10','NodeJS'),('65631ece-792e-11e4-94ec-e96d67bd7d3d','65631d77-792e-11e4-94ec-e96d67bd7d3d',10,10,1,'2014-12-01 13:18:04',NULL),('65bdd403-a0f1-467a-8205-6cff40765c95','41c993bf-53ce-4bc4-966e-34e96b90dadf',45,2,2,'2014-12-15 12:17:05','NodeJS'),('6a99d5e9-d9b2-429b-98cf-f400a8f2271b','38fb60fe-8e1c-4594-bb45-70c1ed164fb2',45,2,2,'2014-12-15 10:51:36','NodeJS'),('6daae788-9e15-4534-9af3-96248ba3dbc4','539a598f-5afd-4ba7-8f36-812bd6f89cda',45,2,2,'2014-12-15 10:52:31','NodeJS'),('753dbe09-7c45-11e4-8b2c-000c29609978','753dbc9b-7c45-11e4-8b2c-000c29609978',10,10,1,'2014-12-05 11:40:48',NULL),('78484cc9-7aaf-4891-b3e5-b97bd85931e9','3b3f7947-3839-4098-ad7f-76a58e97a9bb',20,12,3,'2014-12-12 09:16:31','NodeJS'),('7f6466c6-735d-41dc-8a08-4f5a6c63aefa','3c6f9957-a350-4e68-8eab-22c20ae68704',45,2,2,'2014-12-15 10:46:02','NodeJS'),('7fe4ba88-0594-45ab-915a-0c109cd55846','ba2e0103-48ef-400f-b94b-fc79cbe9eb7c',45,2,2,'2014-12-15 10:54:33','NodeJS'),('812d9353-d931-42a4-8e56-d50c9c53ff95','8a6d4cbe-47f5-4dfd-87c7-27951364bd69',20,12,3,'2014-12-15 10:31:10','NodeJS'),('82ba7866-a045-4399-a49d-10580a02b22d','60bd1af8-d43f-4b01-8202-4598c1c6422f',20,12,3,'2014-12-15 10:51:13','NodeJS'),('84ac5129-b8a4-46ed-928d-740f3816fd24','683dbc41-b67c-4275-96e9-74362adfc4a2',45,2,2,'2014-12-15 12:17:06','NodeJS'),('91b8cacb-f049-44fd-8f77-49f2a00e9079','3b3f7947-3839-4098-ad7f-76a58e97a9bb',45,2,2,'2014-12-12 09:16:31','NodeJS'),('9bed1498-77b6-11e4-94ec-e96d67bd7d3d','9bed143d-77b6-11e4-94ec-e96d67bd7d3d',20,20,1,'2014-11-29 16:28:05',NULL),('a066cd80-d857-4897-8818-2548f712b974','6c8ea0c7-0f35-4627-bd4a-b8800d47d07b',45,2,2,'2014-12-15 12:16:50','NodeJS'),('a4c5417f-8b11-463c-ba5a-7b552563aba6','feaec86d-af4a-45c9-8de1-74129401b3e4',45,2,2,'2014-12-12 08:01:55','Node JS'),('ac0cad5b-7ed5-11e4-8b2c-000c29609978','ac0cab80-7ed5-11e4-8b2c-000c29609978',10,10,1,'2014-12-08 17:58:10',NULL),('ac28dc91-7c3e-11e4-8b2c-000c29609978','ac28da9f-7c3e-11e4-8b2c-000c29609978',10,10,1,'2014-12-05 10:52:14',NULL),('b88de3d6-b015-4698-bd3e-f1a9d9d21f3d','9e2ec9f7-672a-44df-8020-38f73ba97fa5',20,12,3,'2014-12-15 11:39:16','NodeJS'),('bdcf4375-7c49-11e4-8b2c-000c29609978','bdcf416e-7c49-11e4-8b2c-000c29609978',10,10,1,'2014-12-05 12:11:28',NULL),('bffa3842-96d2-4aea-bd31-ce5fb717d5a2','[object Object]',45,2,2,'2014-12-12 07:40:47','Node JS'),('c77be711-fd33-4624-8571-8fe63162eb57','ba2e0103-48ef-400f-b94b-fc79cbe9eb7c',20,12,3,'2014-12-15 10:54:33','NodeJS'),('ceccff53-1876-4815-a25c-774cbc3383a8','887fd1aa-4595-42e8-b9ac-154455ba8f80',45,2,2,'2014-12-15 10:55:30','NodeJS'),('d0f249f1-1698-4049-bbc5-cb5ea395a619','9c1d8474-8b77-4d20-8812-8af623f1de81',45,2,2,'2014-12-16 11:37:59','NodeJS'),('d19d19f6-5601-4fb9-b8f3-fed9798d3890','b68756d5-3c0f-44e7-b8fe-8ac8e107d7ac',20,12,3,'2014-12-15 10:44:52','NodeJS'),('d58d4baf-b38c-4c71-b328-b5fe41bb2af3','a0f704b2-a8cd-4ccf-aa49-718d2f5f3fd9',45,2,2,'2014-12-12 08:22:32','Node JS'),('ded0fcd6-3521-4ce7-8b27-88d2770463c8','b68756d5-3c0f-44e7-b8fe-8ac8e107d7ac',45,2,2,'2014-12-15 10:44:52','NodeJS'),('ec382a25-7eab-40ff-a824-951ecfb9e055','38fb60fe-8e1c-4594-bb45-70c1ed164fb2',20,12,3,'2014-12-15 10:51:36','NodeJS'),('f364a025-0696-44f7-8e62-d6ff8aac5b88','887fd1aa-4595-42e8-b9ac-154455ba8f80',20,12,3,'2014-12-15 10:55:30','NodeJS'),('f4bf116c-17a1-40e8-a70b-7da03c93c2fe','41c993bf-53ce-4bc4-966e-34e96b90dadf',20,12,3,'2014-12-15 12:17:05','NodeJS'),('f821ce45-e0ea-42ab-994e-3a7452dc20ce','3112c288-7a7a-421c-86d3-4d87268cfe6f',45,2,2,'2014-12-15 11:39:43','NodeJS'),('f9d7ead6-d738-4176-9b7d-e138c8d12217','76233673-5264-41dd-a954-ca72e9918c7d',20,12,3,'2014-12-12 09:22:48','NodeJS'),('fc678ebf-4a3a-4339-acc6-13b7dea5d60e','6a5f697c-8ced-4173-b95c-1f9b5b9d0b18',45,2,2,'2014-12-15 10:39:44','NodeJS');
/*!40000 ALTER TABLE `tag_current_util_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_ble_events`
--

DROP TABLE IF EXISTS `tag_ble_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_ble_events` (
  `tag_ble_events_recid` varchar(36) NOT NULL COMMENT 'unique identifier for tag util percent',
  `tag_maint_call_recid` varchar(36) DEFAULT NULL,
  `tag_srno` varchar(100) DEFAULT NULL COMMENT 'References tag_maint_call.tag_srno, for the purpose of Sharding',
  `organization_id` varchar(32) DEFAULT NULL COMMENT 'References tag_maint_call.organization_id, for the purpose of Sharding',
  `num_ble_connect` int(8) unsigned DEFAULT NULL COMMENT 'number of bt connections since last maint interval',
  `ble_connect_timestamp` datetime DEFAULT NULL COMMENT '// more recent ',
  `bt_phone_macaddr` varchar(50) DEFAULT NULL COMMENT '"mac address of iphone ble for each connection event ex: 11:22:33:44:55:66\n                                          it is suggested that a max of MAX_POWERPATH_BLE_MAC_ADDRESSES (2) mac addresses will be stored since last maintenance"',
  `num_ble_dev_find` int(8) unsigned DEFAULT NULL COMMENT 'number of bt dev finds since last maint interval',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_ble_events_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Expecting [MAX_POWERPATH_BLE_MAC_ADDRESSES] 2 records for each tag - maint call - powerpathbleevents_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_ble_events`
--

LOCK TABLES `tag_ble_events` WRITE;
/*!40000 ALTER TABLE `tag_ble_events` DISABLE KEYS */;
INSERT INTO `tag_ble_events` VALUES ('07dbcd52-7c62-11e4-8b2c-000c29609978','07dbc32e-7c62-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:05:20','Cassandra'),('0899b172-7c63-11e4-8b2c-000c29609978','08999b42-7c63-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 12:17:39','Cassandra'),('0e20fb74-8c71-4f1c-bbaa-c2d70ee906d4','448358e6-3d6b-43ab-a8bb-c9d54274fd38',NULL,NULL,12,'2014-07-05 18:30:00','12: 12: 11: 333: 36: 119',1,'2014-12-12 06:11:37','Node JS'),('0e25ed5a-d45e-469d-9927-402ba67a23e0','8f3d1833-61e0-4d9d-8c21-bfe5369552b6',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-15 06:35:02','Node JS'),('1eae917e-8034-11e4-94af-000c29609978','1eae84da-8034-11e4-94af-000c29609978','tag1-GE-10001','Org1',1,'2014-12-10 11:46:46','00:11:@2:33:44:55',1,'2014-12-10 11:46:46','Node JS'),('242d3f9f-b4fc-4f45-96a0-e956903d1d84','e69fc55c-17b6-40c8-acab-04d839242304',NULL,NULL,12,'2015-04-22 06:30:00','101: 899: 102: 456: 234: 345',1,'2014-12-17 11:48:03','Node JS'),('30498700-16ed-4ae2-bff9-576ca5a6fc12','b2b82cc8-73d1-4e62-ba6f-8d320a588679',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-11 13:28:22','Node JS'),('370a468d-de9f-4c7d-8607-f6c1ccf0ab18','7cc50774-5ae8-49ec-8c1f-850a267011cd',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-16 11:37:29','Node JS'),('3aaab6b3-d9fc-4d56-b0ab-b5295bb51647','759cc583-ee6d-4394-9e03-9ddcf05566cc',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-12 06:17:07','Node JS'),('3b52c218-ab62-4b67-b82c-ca512132a6d7','db01ad09-1ea1-4f15-970b-b41eb6e3bc98',NULL,NULL,12,'2014-07-05 18:30:00','12: 12: 11: 333: 36: 119',1,'2014-12-12 06:24:26','Node JS'),('3b7e2948-d1a7-4024-8726-6f02820886d0','58205e99-b358-4f04-b241-2adde0126adf',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-16 11:32:21','Node JS'),('3d343fd1-7ed7-11e4-8b2c-000c29609978','3d342ebb-7ed7-11e4-8b2c-000c29609978',NULL,NULL,1,'2014-12-08 18:09:23','00:11:@2:33:44:55',1,'2014-12-08 17:58:41','Cassandra'),('401b3735-9b9a-4f81-ab09-e78673b3a2c2','aa9f4042-9711-4e1f-aa5c-b4117336508a',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-15 06:39:12','Node JS'),('4e77c29b-0dc6-423b-9e1e-1e7eb7e8fe79','448358e6-3d6b-43ab-a8bb-c9d54274fd38',NULL,NULL,12,'2015-04-22 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-12 06:11:37','Node JS'),('4ea7d161-6361-4daa-9e2e-2a940ef5a50d','9c3fedca-fcc4-4e69-a318-2990bfbe1d19',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-16 11:31:57','Node JS'),('560c34e7-17be-481b-8505-5365e47b4901','759cc583-ee6d-4394-9e03-9ddcf05566cc',NULL,NULL,12,'2014-07-05 18:30:00','12: 12: 11: 333: 36: 119',1,'2014-12-12 06:17:07','Node JS'),('62aa8bbb-4854-4af7-890c-9d999c04062c','170505b2-2adb-4255-9b1f-18e130d7ff34',NULL,NULL,12,'2015-04-22 06:30:00','101: 899: 102: 456: 234: 345',1,'2014-12-12 07:33:11','Node JS'),('64fb8b22-aeb9-471e-b05e-3b9127264f47','72d9af76-7580-40f2-a2db-5be34a276fc4',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-11 12:46:55','Node JS'),('6fcee37c-ade2-490f-a3b3-8d6a57807b1f','8dbaf5d5-07c2-455d-8a0d-90c5cef565e9',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-11 13:40:54','Node JS'),('720d9c38-7c61-11e4-8b2c-000c29609978','720d8259-7c61-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:01:09','Cassandra'),('724428ac-fb28-42c5-919f-02d3a19dc431','58205e99-b358-4f04-b241-2adde0126adf',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-16 11:32:21','Node JS'),('7506af2f-51c6-4e5b-8082-fe7919373592','aa9f4042-9711-4e1f-aa5c-b4117336508a',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-15 06:39:12','Node JS'),('7635cc54-bdc9-4c73-a02a-508aea94eb82','6c771269-83fd-4cc3-a411-838aba28c1b8',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-15 12:54:21','Node JS'),('80c0778b-123a-413f-98b4-f6a4e157bac3','e69fc55c-17b6-40c8-acab-04d839242304',NULL,NULL,12,'2014-07-11 18:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-17 11:48:03','Node JS'),('8c3ebab9-d943-4fd8-be38-0fb0372ffadd','6c771269-83fd-4cc3-a411-838aba28c1b8',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-15 12:54:21','Node JS'),('8d9aaf27-7c62-11e4-8b2c-000c29609978','8d9a8049-7c62-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:09:05','Cassandra'),('8f513233-0c54-4c0a-a3af-19eee6547520','e69fc55c-17b6-40c8-acab-04d839242304',NULL,NULL,12,'2014-07-05 18:30:00','12: 12: 11: 333: 36: 119',1,'2014-12-17 11:48:03','Node JS'),('92147fc5-74ee-4f4a-9955-57d3fce94d56','443cae4c-5701-4e62-ba1e-f6f6ddffff2a',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-11 13:20:20','Node JS'),('9662a22c-ed6b-42b4-b4fe-7383457ae832','72d9af76-7580-40f2-a2db-5be34a276fc4',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-11 12:46:55','Node JS'),('997cc8e0-9c4a-4aba-93c4-bdad3dd651ee','9c3fedca-fcc4-4e69-a318-2990bfbe1d19',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-16 11:31:57','Node JS'),('9b20871b-6ba7-433b-a108-e8b329f2d637','db01ad09-1ea1-4f15-970b-b41eb6e3bc98',NULL,NULL,12,'2014-07-11 18:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-12 06:24:26','Node JS'),('9b65b9a3-0e32-4653-b96c-d238bcb27425','448358e6-3d6b-43ab-a8bb-c9d54274fd38',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-12 06:11:37','Node JS'),('a035c911-0fa5-47be-9859-188b255fcc01','759cc583-ee6d-4394-9e03-9ddcf05566cc',NULL,NULL,12,'2015-04-22 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-12 06:17:07','Node JS'),('a3e3b642-6133-4d5f-8666-2dd78caeb226','b6647381-6391-4f3b-8762-149f13b73baf',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-19 13:49:59','Node JS'),('ac3e2ece-0a4b-4e2b-a870-e2fece5dcb82','443cae4c-5701-4e62-ba1e-f6f6ddffff2a',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-11 13:20:20','Node JS'),('ade45008-7c62-11e4-8b2c-000c29609978','ade445c6-7c62-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:09:59','Cassandra'),('af2229e5-2cf8-46e5-ab76-0f4a4595b8f4','8dbaf5d5-07c2-455d-8a0d-90c5cef565e9',NULL,NULL,12,'2015-04-22 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-11 13:40:54','Node JS'),('b3c8282d-0a85-459b-a4b7-25e04321ff37','170505b2-2adb-4255-9b1f-18e130d7ff34',NULL,NULL,12,'2014-07-05 18:30:00','12: 12: 11: 333: 36: 119',1,'2014-12-12 07:33:11','Node JS'),('bd4714a2-7c61-11e4-8b2c-000c29609978','bd4709a9-7c61-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:03:15','Cassandra'),('c592a893-7c62-11e4-8b2c-000c29609978','c59294ca-7c62-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 12:17:39','Cassandra'),('ca33a265-f0c4-49a5-9ba3-7f85f19b73ce','5f195e49-4bb0-4e7b-835a-4fabd14a34df',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-15 09:10:56','Node JS'),('cde53896-786f-49f1-87d3-ced9f9efbeff','5f195e49-4bb0-4e7b-835a-4fabd14a34df',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-15 09:10:56','Node JS'),('cedad4c1-c477-433d-9b78-9f6bc74ec8d8','c02ffed4-6de1-40c6-aef8-1cbeea05b158',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-19 14:02:11','Node JS'),('d12c6ee3-d339-4ef3-973a-dac47bc742e2','170505b2-2adb-4255-9b1f-18e130d7ff34',NULL,NULL,12,'2014-07-11 18:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-12 07:33:11','Node JS'),('d3b8c8d4-4bee-413a-9378-e8e9cbdc810c','b6647381-6391-4f3b-8762-149f13b73baf',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-19 13:49:59','Node JS'),('d70205da-beff-48b1-a4af-eefcabe45332','7cc50774-5ae8-49ec-8c1f-850a267011cd',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-16 11:37:29','Node JS'),('d9a9a641-4b96-4b65-82f1-5d1f180acf9c','b2b82cc8-73d1-4e62-ba6f-8d320a588679',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-11 13:28:22','Node JS'),('dfce0a4b-e383-466b-b2bb-0c2a92f90ca1','c5e59082-7a54-4433-bc17-25cc43d41982',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-15 08:42:26','Node JS'),('e53f90ce-7c61-11e4-8b2c-000c29609978','e53f7728-7c61-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 15:04:22','Cassandra'),('e654b685-8f84-4709-9ec5-b5e7b371a7dc','c5e59082-7a54-4433-bc17-25cc43d41982',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-15 08:42:26','Node JS'),('e76c5c58-8033-11e4-94af-000c29609978','e76c53be-8033-11e4-94af-000c29609978','tag1-GE-10001','Org1',1,'2014-12-10 11:45:14','00:11:@2:33:44:55',1,'2014-12-10 11:45:14','Node JS'),('eeeaa48c-7c62-11e4-8b2c-000c29609978','eeea988a-7c62-11e4-8b2c-000c29609978',NULL,NULL,1,NULL,NULL,1,'2014-12-05 12:17:39','Cassandra'),('f0b3633f-2ed3-4243-8d9a-60bc8fb4fd8d','8f3d1833-61e0-4d9d-8c21-bfe5369552b6',NULL,NULL,12,'2013-06-20 06:30:12','101: 899: 102: 456: 234: 345',1,'2014-12-15 06:35:02','Node JS'),('f30b4bd3-235c-4741-8f09-5f1bd7d2f619','db01ad09-1ea1-4f15-970b-b41eb6e3bc98',NULL,NULL,12,'2015-04-22 06:30:00','101: 899: 102: 456: 234: 345',1,'2014-12-12 06:24:26','Node JS'),('f790c400-3b2a-4818-b9ac-d76687a99687','c02ffed4-6de1-40c6-aef8-1cbeea05b158',NULL,NULL,12,'2014-07-12 09:36:45','10: 010: 11: 333: 36: 119',1,'2014-12-19 14:02:11','Node JS');
/*!40000 ALTER TABLE `tag_ble_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pim_stats_header`
--

DROP TABLE IF EXISTS `pim_stats_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pim_stats_header` (
  `pim_stats_header_recid` varchar(36) NOT NULL COMMENT 'uuid() unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL,
  `tag_srno` varchar(100) DEFAULT NULL,
  `organization_id` varchar(32) DEFAULT NULL,
  `curr_timestamp` datetime DEFAULT NULL,
  `num_ac_plugins` int(16) unsigned DEFAULT NULL COMMENT '// timestamps of plug-ins since last maint interval',
  `num_pim_blocks` int(16) unsigned DEFAULT NULL COMMENT 'most recent N blocks of data (as dictated by memory)',
  `num_samples_in_block` int(16) unsigned DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`pim_stats_header_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='PIM Stats is split into two tables because each pim stats has a header information here and upto 100 data packets info in pim_stats_data table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pim_stats_header`
--

LOCK TABLES `pim_stats_header` WRITE;
/*!40000 ALTER TABLE `pim_stats_header` DISABLE KEYS */;
INSERT INTO `pim_stats_header` VALUES ('0f20d59b-9f9b-4233-b068-87d7183f7a41',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:34','Node JS'),('0f4707ca-b415-4096-9dd8-21a4b57f1768',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-02 06:01:00','Node JS'),('13c14c1b-93fb-4637-b4e2-ff728d1b3239',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-03 09:04:55','Node JS'),('15e6137e-c88c-4f94-a065-f7c905222e4b',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 13:27:35','Node JS'),('1daf8599-4bd4-47b5-8b42-fb98603a8446','366e66e8-c6c4-4d48-90cc-7bd572f968b7','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:18:19','NodeJS'),('1feae441-a0e9-466e-bd05-2df4a709b7ac',NULL,NULL,NULL,NULL,NULL,5,4,'2014-12-01 11:29:03','Node JS'),('203fdc43-3430-4b6b-b535-27528905d948','586f2650-26e3-4566-bec3-4adbe8b368f5','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:26:41','NodeJS'),('2742bc78-073a-4fff-9fff-b5e3c2e8fe04',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-03 09:04:24','Node JS'),('2def74e2-97d7-431d-860b-5a199cdde672','c644faa3-59d6-4001-a88c-82066e94223c','tag3-GE-10001','3',NULL,53,62,68,'2014-12-12 07:08:12','NodeJS'),('2f46c413-9705-4417-9d3e-cc3b597f0cb5',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 12:22:04','Node JS'),('2fa17279-d9c6-4467-b11b-95e0cf851e15','78113aa5-f230-4185-adcb-5279578c1800','12345','12345',NULL,1,1,4,'2014-12-11 19:21:49','NodeJS'),('32cfa14a-fe79-4f08-8cc8-083f6bbfd0d4',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:37','Node JS'),('3360dcf0-4d1d-411c-bfe4-af1b80198c4b',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-02 06:01:05','Node JS'),('388eb3b8-a989-4fc6-a451-a5c0068d88db',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-03 09:03:51','Node JS'),('3b5c9195-36bf-4510-b608-e954528377b9',NULL,NULL,NULL,NULL,NULL,5,4,'2014-12-04 16:52:24','Node JS'),('40a98d0f-2acc-4d3a-88a6-112d7eba48ad',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 12:08:21','Node JS'),('4924819a-09ad-4d6a-936c-8d8e23c865da','594aecd2-771d-4269-8a03-244a299c1d47','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 12:52:52','NodeJS'),('493f0553-3c54-4b83-b540-1b03cb711080',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:33','Node JS'),('501d3e27-be6f-43a1-8831-979109a5bd6a','4146be30-b2e6-4da7-a18c-2119e6c01bde','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:21:59','NodeJS'),('58144972-9fca-4fb9-94e9-fb7cd437a653','5679a973-dd40-461a-aa1a-061104bee7f7','tag3-GE-10001','3',NULL,53,62,68,'2014-12-16 11:37:10','NodeJS'),('64824546-c09b-470a-b139-d6bcb573eee6','728af2b2-9a5a-42b2-a591-072d6c13f856','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:18:46','NodeJS'),('71999f23-be55-4cb7-b1c8-9b8a72983565','db103680-26ff-42ed-90e3-95f1514ae481','tag3-GE-10001','3',NULL,53,62,68,'2014-12-12 08:06:49','NodeJS'),('7ae3e5c7-a407-47a5-b882-32f8b326485c','65770648-215c-41bd-b094-c51126d72881','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:25:58','NodeJS'),('7da5f99c-e6eb-4486-9e12-2875d737269c','d57d3b3a-17e3-4807-951e-6b4d0c668e14','tag3-GE-10001','3',NULL,53,62,68,'2014-12-16 11:36:31','NodeJS'),('80ade5cb-d4de-4e1b-83d5-c8538348b433','4eb5bab6-f384-425b-989d-a98be7cee24d','tag3-GE-10001','3',NULL,53,62,68,'2014-12-12 07:21:23','NodeJS'),('8209b261-7c44-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978',NULL,NULL,'2014-12-05 11:34:00',NULL,10,10,'2014-12-05 10:43:15','Cassandra'),('865ddcc3-6e7c-4a98-a409-eda7ec4995d1',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 10:57:25',NULL),('87af45e1-f39f-470b-b5a0-ce18ac5bdd34',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 11:48:58','Node JS'),('88f8ae22-576e-4fe1-baec-066a66424c84','070ff2a0-a407-4cd9-8f54-34e860ffbdff','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:16:59','NodeJS'),('8ad194da-5145-4eb4-986c-2c9010b6a3d1',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:35','Node JS'),('8c479a60-a383-4a85-864b-b880466acd12',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 13:28:19','Node JS'),('972d7a84-feab-42db-8e81-07a3831630bd','56c95bf6-5851-4a8d-ac81-45cee2382dc6','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:17:54','NodeJS'),('a1160f30-bade-4e2e-a9a1-5ee349db0e4f',NULL,NULL,NULL,NULL,NULL,5,4,'2014-12-01 11:46:53','Node JS'),('a263922e-7ed5-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1','2014-12-08 17:57:54',1,10,10,NULL,'Node JS'),('a2680d4f-9d03-4f47-90ba-29c726884d56','8d4f0b49-99b1-4621-ae7f-69ad64e30446','tag3-GE-10001','3',NULL,53,62,68,'2014-12-15 11:21:19','NodeJS'),('b2e05def-427d-44a5-9211-e8ac87c17374','58da9e8a-79eb-4d26-b167-1e7352139412','tag3-GE-10001','3',NULL,53,62,68,'2014-12-12 08:02:57','NodeJS'),('ba96d62b-3bd8-475f-bd89-8763700020ec',NULL,NULL,NULL,NULL,NULL,5,4,'2014-12-01 11:05:54','Node JS'),('c1a2dedc-c369-470f-9a6a-b2183d5bda7b',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 11:54:30','Node JS'),('c5783a9a-d13e-4461-b0b4-7d1506e4c9bf',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 11:02:21','Node JS'),('cc53df48-ba19-47bb-8399-6c782b0be5f0','1be2f70e-7ac9-45ef-bdf4-ccd6ecc76f47','4','3',NULL,44,61,61,'2014-12-16 18:42:17','NodeJS'),('cef11616-7c3e-11e4-8b2c-000c29609978','12345677-223-4536',NULL,NULL,'2014-12-05 10:53:12',NULL,10,10,'2014-12-05 10:43:15','Cassandra'),('d139d6b7-523f-4ab4-86b8-848bfe7a5220',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:34','Node JS'),('d55095cf-9eb0-4e03-b4d5-445fba0b61ae',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 12:09:56','Node JS'),('da9e4710-832b-49d7-b2b9-ac34a1f9751f',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-03 09:04:48','Node JS'),('dde81da1-e601-40d3-bee0-367ab44405b4',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-01 12:13:52','Node JS'),('e3e997fa-d7e2-4698-923b-37f685803571',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-04 16:50:13','Node JS'),('e7bfe9eb-b24b-449b-95b5-deb3431cb2a1',NULL,NULL,NULL,NULL,NULL,0,0,'2014-12-03 09:02:45','Node JS'),('eab1b39e-286b-45fb-81d3-743fcb00f29d','9aa32c34-d7ce-43dd-bd8b-93757a4dc782','3','3',NULL,53,62,68,'2014-12-18 11:32:24','Node JS'),('ec29278e-9801-43dc-b25e-4da46bc4f6ef','1d96c5b8-a22b-49c0-82ce-cc67f4f8dfa9','tag3-GE-10001','3',NULL,53,62,68,'2014-12-12 07:12:30','NodeJS'),('f1d13221-7c3d-11e4-8b2c-000c29609978','223424433432',NULL,NULL,'2014-12-05 10:47:01',NULL,10,10,'2014-12-05 10:43:15','Cassandra');
/*!40000 ALTER TABLE `pim_stats_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_forgot_password`
--

DROP TABLE IF EXISTS `user_forgot_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_forgot_password` (
  `user_fpass_recid` varchar(36) NOT NULL,
  `user_recid` varchar(36) NOT NULL,
  `str_token` varchar(20) NOT NULL,
  `created_on` datetime NOT NULL,
  `is_valid` tinyint(4) NOT NULL,
  PRIMARY KEY (`user_fpass_recid`),
  KEY `fk_user_fpass_user_recid` (`user_recid`),
  CONSTRAINT `fk_user_fpass_user_recid` FOREIGN KEY (`user_recid`) REFERENCES `user_m` (`user_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_forgot_password`
--

LOCK TABLES `user_forgot_password` WRITE;
/*!40000 ALTER TABLE `user_forgot_password` DISABLE KEYS */;
INSERT INTO `user_forgot_password` VALUES ('0afcdaad-9ded-4481-b78d-312216fbc7d4','dcd91a23-dbb2-4705-8a87-de69d43ec08e','0fa9f1eb996a79f1','2014-12-22 16:28:47',0),('6d05557b-8fbd-4048-ad99-bef6542bf273','dcd91a23-dbb2-4705-8a87-de69d43ec08e','3c0ad6c2f55a513b','2014-12-22 16:29:38',1);
/*!40000 ALTER TABLE `user_forgot_password` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_current_thresh`
--

DROP TABLE IF EXISTS `tag_current_thresh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_current_thresh` (
  `tag_current_thresh_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `thresh_off` int(16) unsigned DEFAULT NULL COMMENT 'threshold: unplugged to plugged off',
  `thresh_inactive` int(16) unsigned DEFAULT NULL COMMENT 'threshold: plugged off to on inactive',
  `thresh_active` int(16) unsigned DEFAULT NULL COMMENT 'threshold: on inactive to active',
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_current_thresh_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='usd-0010, usd-0020: note these may change as we develop algorithm further - powerPathCurrentThresh_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_current_thresh`
--

LOCK TABLES `tag_current_thresh` WRITE;
/*!40000 ALTER TABLE `tag_current_thresh` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_current_thresh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country_m`
--

DROP TABLE IF EXISTS `country_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country_m` (
  `country_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `country_name` varchar(50) NOT NULL,
  `voltage_level` int(3) NOT NULL,
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
-- Table structure for table `tag_battery_config`
--

DROP TABLE IF EXISTS `tag_battery_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_battery_config` (
  `tag_battery_config_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `battery_rechargelevel_percent` int(8) unsigned DEFAULT NULL COMMENT 'trigger point for recharging',
  `battery_chargelevel_percent` int(8) unsigned DEFAULT NULL COMMENT 'charge the battery to this level',
  `battery_threshlow_alert` int(8) unsigned DEFAULT NULL COMMENT 'battery level worrisome',
  `battery_threshcritical_alert` int(8) unsigned DEFAULT NULL COMMENT 'battery level critically low',
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_battery_config_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_battery_config`
--

LOCK TABLES `tag_battery_config` WRITE;
/*!40000 ALTER TABLE `tag_battery_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_battery_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organization_m`
--

DROP TABLE IF EXISTS `organization_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organization_m` (
  `organization_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `organization_id` varchar(32) NOT NULL,
  `organization_name` varchar(100) NOT NULL,
  `license_recid` varchar(36) NOT NULL,
  `country_recid` varchar(36) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `organization_url` varchar(100) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`organization_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organization_m`
--

LOCK TABLES `organization_m` WRITE;
/*!40000 ALTER TABLE `organization_m` DISABLE KEYS */;
/*!40000 ALTER TABLE `organization_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pending_events`
--

DROP TABLE IF EXISTS `pending_events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pending_events` (
  `pending_event_recid` varchar(36) NOT NULL COMMENT 'unique identifier',
  `tag_srno` varchar(100) DEFAULT NULL,
  `organization_id` varchar(32) DEFAULT NULL,
  `event_type_id_enum` int(4) DEFAULT NULL,
  `DATA` varchar(100) DEFAULT NULL,
  `is_processed` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`pending_event_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this is internal database to store the bunch of commands that need to be sent to a given tag. no changes required here';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pending_events`
--

LOCK TABLES `pending_events` WRITE;
/*!40000 ALTER TABLE `pending_events` DISABLE KEYS */;
INSERT INTO `pending_events` VALUES ('15d53831-cb43-408e-90d0-887df09c23e0',NULL,NULL,1,'102',0,1,'2014-12-03 16:40:19','2014-12-03 16:40:19',NULL),('15d53831-cb43-408e-90d0-887df09c23e1',NULL,NULL,2,'http://osmosys.asia/getFW/1',0,1,'2014-12-03 16:40:42','2014-12-03 16:40:42',NULL),('15d53831-cb43-408e-aad0-887df09c23e1',NULL,NULL,3,'value3',0,1,'2014-12-03 16:41:03','2014-12-03 16:41:03',NULL);
/*!40000 ALTER TABLE `pending_events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_info`
--

DROP TABLE IF EXISTS `tag_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_info` (
  `tag_info_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL COMMENT '// more recent batteryCharge',
  `tag_serial_num` varchar(100) DEFAULT NULL COMMENT 'Includes product code, year and week manufactured, production sequence number, manufacturing site, and a misc. characteristic',
  `organization_id` varchar(32) DEFAULT NULL,
  `tag_config_params_recid` varchar(36) DEFAULT NULL,
  `device_type_recid` varchar(36) DEFAULT NULL,
  `device_id` varchar(100) DEFAULT NULL,
  `device_srno` varchar(100) DEFAULT NULL,
  `customer_id` int(32) unsigned DEFAULT NULL COMMENT '// unique customerID',
  `tag_model_number` varchar(16) DEFAULT NULL,
  `tag_manufacturer_name` varchar(100) DEFAULT NULL,
  `hardware_version` char(3) DEFAULT NULL COMMENT 'major.minor (8bits for major and minor)',
  `wifi_macaddr` varchar(50) DEFAULT NULL COMMENT 'tag',
  `tag_config_state_id_enum` int(4) DEFAULT NULL,
  `hw_peripherals` char(2) DEFAULT NULL COMMENT 'bitfield to indicate if these hw peripherals are populated\n                                                    bit(0) = locking connector, bit(1) = ir, bit(2) = lf, bit(4) = tamper bit(5) = ble"',
  `host_firmware_version` char(3) DEFAULT NULL COMMENT 'major.minor (8bits for major and minor)',
  `wifi_firmware_version` char(3) DEFAULT NULL COMMENT 'major.minor (8bits for major and minor)',
  `ble_firmware_version` char(3) DEFAULT NULL COMMENT 'major.minor (8bits for major and minor)',
  `tag_config_version` char(3) DEFAULT NULL COMMENT ' 0 - 100',
  `factory_test_time` datetime DEFAULT NULL COMMENT '// timestamp of when tag was configured',
  `config_time` datetime DEFAULT NULL COMMENT '// timestamp of when tag was configured',
  `nearest_ap_rssi_dbm` int(8) unsigned DEFAULT NULL COMMENT '// wifi network info nearest application(iphone) rssi',
  `nearest_ap_macaddr` varchar(50) DEFAULT NULL COMMENT '// wifi network info ex: 11:22:33:44:55:66',
  `tag_desc` varchar(500) DEFAULT NULL,
  `tag_ip_setting` varchar(10) DEFAULT NULL,
  `expected_fw_version` varchar(100) DEFAULT NULL COMMENT 'we have to calculate this',
  `is_commissioned` int(11) DEFAULT NULL,
  `commissioned_on` datetime DEFAULT NULL,
  `device_last_used_on` datetime DEFAULT NULL,
  `last_maintenance_date` datetime DEFAULT NULL,
  `last_tag_maint_call_recid` varchar(36) DEFAULT NULL COMMENT 'to maintain link with latest maintenanace parameters of this tag',
  `maint_delay_alert` tinyint(1) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  `modified_on` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tag_info_recid`),
  UNIQUE KEY `uk_serialnum` (`tag_serial_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this data is reported at startup so the server knows the h/w capabilities. \n  This info is also sent at the beginning over every maint call (some of the fields are redundant and we will prune it later)\n  ble mac address should be assumed to wifimacaddr + 1\n  the tag info - powerpathinfo_t (c structure) has two types of data \n  (1) static data like serial no, hw_peripherals etc and then the values that change over time - firmwares that change less frequently - \n  and values like battery level % and predicted values that change in every cycle so we may not be able to put all of them into the same table.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_info`
--

LOCK TABLES `tag_info` WRITE;
/*!40000 ALTER TABLE `tag_info` DISABLE KEYS */;
INSERT INTO `tag_info` VALUES ('157961c7-7537-11e4-94a6-000c29609978',NULL,'tag3-GE-10001','3','','2a57de6a-7550-11e4-94a6-000c29609978','',NULL,222,'3333','GE Dash 3k #4444','81','12:34:123:41:23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Tag manufacturer - GE Dash 3k #125, Model - 3434 - Serial Number 5 ','192.168.1.',NULL,1,'2014-11-27 10:38:06','2014-12-06 14:59:04','2014-12-10 10:42:16','07dbc32e-7c62-11e4-8b2c-000c29609978',127,1,'2014-11-26 12:10:08','Test data',NULL,NULL),('19737645-7537-11e4-94a6-000c29609978',NULL,'tag2-GE-10001','3',NULL,'08999b42-7c63-11e4-8b2c-000c29609978','',NULL,222,'3333','GE Dash 3k #4444','81','12:34:123:41:23',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'Tag manufacturer - GE Dash 3k #125, Model - 3434 - Serial Number 6 ','192.168.1.',NULL,1,'2014-11-27 10:38:06','0000-00-00 00:00:00','2014-12-10 10:42:16','07dbc32e-7c62-11e4-8b2c-000c29609978',127,1,'2014-11-26 12:10:14','Test data',NULL,NULL),('342bfb07-6a0b-45e3-a4a9-7c3dabf864c2','994070be-2181-4f3a-99b6-6e95adcccb76','5c380983-815d-4fbc-bd54-f3a0d3339468','3',NULL,NULL,'5345',NULL,787878789,NULL,NULL,'a1','12:34:23:45:34:28',2,'un','ab','a1','12','23','2014-03-08 11:42:10','2014-09-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2014-12-18 16:40:19',NULL,NULL,1,'2014-12-16 14:18:27','Node JS','0000-00-00 00:00:00','undefined'),('7ce05c6d-5b1e-4c9c-8b25-9ce6be90b032','0391410c-e67f-4134-b43f-4cdf1eec9430','125e9802-0b55-4418-bfb3-31816112b4a8','3','',NULL,'676767676',NULL,787878789,NULL,NULL,'a1','12:34:23:45:34:28',2,'a','ab','a1','12','23','2014-11-08 11:42:10','2014-05-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2014-12-18 16:43:25',NULL,NULL,1,'2014-12-16 13:06:50','Node JS','0000-00-00 00:00:00','undefined'),('a90f66fb-7c6d-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','3',NULL,'720d8259-7c61-11e4-8b2c-000c29609978','Ventilator - GE make - 10001 Modelnumber',NULL,1111,'3333','GE Dash 3k #4444','1','11:22:33:44:55:66',1,'1','1','1','1','1','2014-12-08 17:58:41','2014-12-08 17:58:41',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'2014-12-10 10:42:16','1eae84da-8034-11e4-94af-000c29609978',NULL,1,'2014-12-08 17:58:41','Modified by Node JS',NULL,NULL),('b1f14792-c54b-4720-ad6e-0c5fc8d15ec1','57502e3e-8bab-4312-9029-1043b9f1768d','Tag-TI-2002','20',NULL,NULL,'5345',NULL,999,NULL,NULL,'a1','12:34:23:45:34:28',2,'b','ab','a1','12','35','2015-03-08 11:42:10','2013-09-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-18 06:51:06','Node JS','2014-12-18 06:53:01','Node JS'),('b2426e1a-491e-4e8a-82a2-071c796cf28d','79f20ce1-bdbe-4cea-9b19-49c66e4f05d6','f9b2eb14-de39-4391-90be-14b756536d42','25',NULL,NULL,'676767676',NULL,787878789,NULL,NULL,'a1','12:34:23:45:34:28',2,'a','ab','a1','12','23','2014-11-08 11:42:10','2014-05-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-17 09:56:05','Node JS',NULL,NULL),('c9d35454-2bdd-43d9-9aed-3ad1c190ccf3','7db53cf9-7e44-40a9-90b5-6e41b3945742','Tag=TI-2002','25',NULL,NULL,'676767676',NULL,787878789,NULL,NULL,'a1','12:34:23:45:34:28',2,'a','ab','a1','12','23','2014-11-08 11:42:10','2014-05-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-17 11:47:35','Node JS',NULL,NULL),('d85d12f2-16df-4dcf-9448-3d6d21b91a36','e39131f6-4656-4351-9cbf-432570f920e5','f9b2eb13-de39-4391-90be-14b756536d42','3',NULL,NULL,'5345',NULL,999,NULL,NULL,'a1','12:34:23:45:34:28',2,'b','ab','a1','12','35','2015-03-08 11:42:10','2013-09-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-16 14:43:50','Node JS','2014-12-16 14:44:38','Node JS'),('f1b5bbba-7c6d-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10004','3',NULL,'8d9a8049-7c62-11e4-8b2c-000c29609978','Ventilator - GE make - 10001 Modelnumber',NULL,222,'3333','GE Dash 3k #4444','1','11:22:33:44:55:66',1,'1','1','1','1','1','2014-12-05 16:30:37','2014-12-05 16:30:37',NULL,NULL,NULL,NULL,NULL,NULL,NULL,'0000-00-00 00:00:00','2014-12-10 10:42:16','07dbc32e-7c62-11e4-8b2c-000c29609978',NULL,1,'2014-12-05 16:30:37','Node JS',NULL,NULL),('f489439b-7052-4f4b-af8d-a8d967f86514','ee3c77d1-0d63-4f44-b411-b7fce4f9ddd6','c6f2d232-ee37-44dc-bca4-264a93fcd766','3',NULL,NULL,'787878',NULL,0,NULL,NULL,'un','undefined',0,'a','un','un','un','un','2014-11-08 11:42:10','2014-05-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-16 07:55:14','Node JS','2014-12-16 07:55:14','Node JS'),('f53f22dc-d35c-4773-80c9-a0d13c822f25','3ff88c52-bb38-494d-9e53-f97640244c80','be6909ef-1466-4fba-84da-ce209c5f0b4a','3',NULL,NULL,'676767676',NULL,787878789,NULL,NULL,'a1','12:34:23:45:34:28',2,'a','ab','a1','12','23','2014-11-08 11:42:10','2014-05-21 02:42:20',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,'2014-12-16 14:25:50','Node JS','2014-12-16 14:43:07','Node JS');
/*!40000 ALTER TABLE `tag_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_m`
--

DROP TABLE IF EXISTS `user_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_m` (
  `user_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `user_name` varchar(100) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `email_id` varchar(100) NOT NULL,
  `user_timezone` varchar(100) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_recid`),
  UNIQUE KEY `email_id` (`email_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_m`
--

LOCK TABLES `user_m` WRITE;
/*!40000 ALTER TABLE `user_m` DISABLE KEYS */;
INSERT INTO `user_m` VALUES ('221a6302-37ca-4622-9fea-232ecdda55b0','Neil Diener','$2a$10$bkjnDt6xmC5CYZPePfQf4O0zxsF.V6UkgTQn4uujxTWWNsAB1nFea','000-000-0000','ndiener@emanatewireless.com','Asia/Anadyr',NULL,1,'2014-12-22 01:54:12','2014-12-22 01:54:12',NULL),('48fe56d8-e1c6-48a7-aa3b-1f71c5f4da9c','The Squarish Brackets','$2a$10$2ZO3el0k2s8zDQ1JilNuY.GHjou1yRud8t7FXCd6dMuhol3Y25zK6','000-000-0000','thesquarebrackets@gmail.com','Asia/Anadyr',NULL,1,'2014-12-20 12:40:24','2014-12-20 12:40:24',NULL),('627786a9-2fb3-4e45-9fc7-e6f7aef605cc','Gary Sugar','$2a$10$HkmHhSu/ky0V73PWUpScD.lcm6U3ezuplJXidZjUt6f0u1lsdB7om','000-000-0000','gsugar@emanatewireless.com','Asia/Anadyr',NULL,1,'2014-12-22 16:22:28','2014-12-22 16:22:28',NULL),('82075206-4de6-4bbf-a342-f1196bb27f3d','Test User','$2a$10$vIskXxyMg7CIt7QSu3G/juoO9FyrDMVrslXVfIQtllnEwM1NLG5OK','000-000-0000','garysugar@gmail.com','Asia/Anadyr',NULL,1,'2014-12-22 14:17:01','2014-12-22 14:17:01',NULL),('b44d7f3d-aaa3-4158-be70-73244c0b3eac','Gary Sugar','$2a$10$.mXnv/65TxbmoqF5wtDhCOfmRJ5WvbiCz5xIeJsvW2fBDlC46TDzK','000-000-0000','gasugar@gmail.com','Asia/Anadyr',NULL,1,'2014-12-20 19:01:17','2014-12-20 19:01:17',NULL),('dcd91a23-dbb2-4705-8a87-de69d43ec08e','Abijeet Patro','$2a$10$WRR0X8Esxdf7INB.8alivOgn77bFHDTUbBFjWSj9g8FTmvbaof2LC','000-000-0000','abijeet.p@osmosys.asia','Asia/Anadyr',NULL,1,'2014-12-20 12:39:50','2014-12-20 12:39:50',NULL),('f5ede1e1-4a49-483c-86a0-76570d6d4b93','srinivas','$2a$10$s5AwEEL2f//Qr0ZRB5wc1.qMz54jyhDxYshUNNMmZGDiIrdUlNL9u','000-000-0000','srinivas.m@osmosys.asia','Asia/Anadyr',NULL,1,'2014-12-20 13:02:05','2014-12-20 13:02:05',NULL);
/*!40000 ALTER TABLE `user_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_current_data`
--

DROP TABLE IF EXISTS `tag_current_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_current_data` (
  `tag_current_data_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL COMMENT 'references cassandra dump recid, incase data is inserted/ updated by Node JS',
  `tag_srno` varchar(100) DEFAULT NULL,
  `organization_id` varchar(32) DEFAULT NULL,
  `start_timestamp` int(11) DEFAULT NULL,
  `num_samples` int(16) unsigned DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tag_current_data_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='This is the response TO the command: POWERPATH_REPORT_CURRENT_UTIL_DATA with lookup_key = ''powerPathCmds''\nthe tag will report up TO N powerPathCurrentData_t measurements bursts IN an array AS shown below. \npowerPathCurrentData_t *pCurrentData  powerPathCurrentData_t (C Structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_current_data`
--

LOCK TABLES `tag_current_data` WRITE;
/*!40000 ALTER TABLE `tag_current_data` DISABLE KEYS */;
INSERT INTO `tag_current_data` VALUES ('3112c288-7a7a-421c-86d3-4d87268cfe6f','19b4efb7-e547-456c-902a-b569fe43abaa','tag3-GE-10001','3',12,23,'2014-12-15 11:39:43','Node JS'),('38fb60fe-8e1c-4594-bb45-70c1ed164fb2','ef711fc2-aeea-43f6-adf8-1be75e6befc3','tag3-GE-10001','3',24,34,'2014-12-15 10:51:32','Node JS'),('3b3f7947-3839-4098-ad7f-76a58e97a9bb','fbaa0902-32e6-4343-b507-41e5cc2d522c','tag1-TI-20001','12',12,23,'2014-12-12 09:16:01','Node JS'),('3c6f9957-a350-4e68-8eab-22c20ae68704','0971b2d6-b18a-442f-bfd7-89af46c98b54','tag3-GE-10001','3',10,30,'2014-12-15 10:45:46','Node JS'),('41c993bf-53ce-4bc4-966e-34e96b90dadf','392bfa25-b3fa-409a-9e7f-28055adaffba','tag3-GE-10001','3',12,23,'2014-12-15 12:17:05','Node JS'),('539a598f-5afd-4ba7-8f36-812bd6f89cda','98279c65-4305-4b5d-8047-2c96661078e4','tag3-GE-10001','3',12,23,'2014-12-15 10:52:25','Node JS'),('60bd1af8-d43f-4b01-8202-4598c1c6422f','632a6959-f052-48b4-bf82-2e1a23e00f34','tag3-GE-10001','3',12,23,'2014-12-15 10:51:10','Node JS'),('683dbc41-b67c-4275-96e9-74362adfc4a2','7e787036-3512-42c4-a240-d6e72240e006','tag3-GE-10001','3',12,23,'2014-12-15 12:17:06','Node JS'),('6a5f697c-8ced-4173-b95c-1f9b5b9d0b18','7ad260e6-7d81-49a0-af0b-d73dd1fd98bd','tag3-GE-10001','3',12,23,'2014-12-15 10:39:42','Node JS'),('6c20631c-2a80-418e-84cc-43790a24335f','cd33d562-e342-4929-9963-5fbaac2d83ff','tag1-TI-20001','12',12,23,'2014-12-15 11:43:27','Node JS'),('6c8ea0c7-0f35-4627-bd4a-b8800d47d07b','6db9e41b-21ec-4591-90da-b65a2a5ed67b','tag3-GE-10001','3',12,23,'2014-12-15 12:16:50','Node JS'),('76233673-5264-41dd-a954-ca72e9918c7d','90a8633f-16a2-4235-9c57-56ceecaba10e','tag1-TI-20001','12',12,23,'2014-12-12 09:22:48','Node JS'),('887fd1aa-4595-42e8-b9ac-154455ba8f80','c7a94922-f793-46dc-8c04-2f1402421d91','tag3-GE-10001','3',12,23,'2014-12-15 10:55:29','Node JS'),('8a6d4cbe-47f5-4dfd-87c7-27951364bd69','bbc6e58a-ef20-4b1d-bc8e-e38f68c3f411','tag3-GE-10001','3',12,23,'2014-12-15 10:31:06','Node JS'),('9c1d8474-8b77-4d20-8812-8af623f1de81','afda06f3-b729-479c-940f-5f8886105e64','tag3-GE-10001','3',12,23,'2014-12-16 11:37:59','Node JS'),('9e2ec9f7-672a-44df-8020-38f73ba97fa5','8d887e15-7afb-4bd0-96de-af26f7853a1b','tag1-TI-20001','12',12,23,'2014-12-15 11:39:16','Node JS'),('a0f704b2-a8cd-4ccf-aa49-718d2f5f3fd9','beeaf876-1ea8-4f7f-9520-e49ef4d740af','tag3-GE-10001','3',NULL,23,'2014-12-12 08:22:32','Node JS'),('ac0cab80-7ed5-11e4-8b2c-000c29609978','157961c7-0000-11e4-94a6-000c29609978','tag1-GE-10001','Org1',11,1,'2014-12-08 17:58:10','Node JS'),('b68756d5-3c0f-44e7-b8fe-8ac8e107d7ac','d15dd138-9b59-4e83-bb2f-14983f2be269','tag3-GE-10001','3',12,23,'2014-12-15 10:44:49','Node JS'),('ba2e0103-48ef-400f-b94b-fc79cbe9eb7c','06d4f9c5-38fb-43c4-ae78-74e2020d6fe3','tag3-GE-10001','3',12,23,'2014-12-15 10:54:29','Node JS'),('d6130e57-9f3a-4d8d-8368-845fbe032d3e','514cc1f0-7060-4f58-bfdd-b6e38db3f9c4','tag1-TI-20001','12',12,23,'2014-12-15 06:13:11','Node JS'),('dc5d9054-75a7-4094-96cb-c616c0737b6b','d642d609-081c-46bc-947b-bca014297644','tag3-GE-10001','3',12,23,'2014-12-15 10:27:33','Node JS'),('dfc81c83-1443-43f2-b172-d2e6a1ee347b','49c38f10-c35d-4d24-ab6a-c794505615a5','tag3-GE-10001','3',12,23,'2014-12-15 10:56:34','Node JS'),('e5dca01e-a45c-4714-9d94-4671698e1284','79d42f32-b00c-40d9-9812-4f52d85aaf92','tag1-TI-20001','12',12,23,'2014-12-15 11:41:36','Node JS'),('f1a055af-ef1f-4a2f-8d94-c17f4fffcca9','3ceac9fa-2a84-4c96-be8e-983bea288a7e','tag3-GE-10001','3',12,23,'2014-12-12 08:34:35','Node JS'),('feaec86d-af4a-45c9-8de1-74129401b3e4','213713a4-e728-4296-a200-35c0ce5fd29c','tag1-GE-10001','Org1',10,23,'2014-12-12 07:59:34','Node JS');
/*!40000 ALTER TABLE `tag_current_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_ble_config`
--

DROP TABLE IF EXISTS `tag_ble_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_ble_config` (
  `tag_ble_config_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `ble_enable` tinyint(1) unsigned DEFAULT NULL COMMENT 'enable ble bitmap: enable (0), sendblink on chokepoint det (1)"',
  `ble_gaprole_min_conninterval_ms` int(8) unsigned DEFAULT NULL COMMENT 'bt gap roles interval (default 8*1.25ms)',
  `ble_gaprole_max_conninterval_ms` int(8) unsigned DEFAULT NULL COMMENT 'bt gap role pam (default 8*1.25ms)',
  `ble_gaprole_slave_latency` int(8) unsigned DEFAULT NULL COMMENT 'bt gap role param (default 9)',
  `ble_limited_advert_ontime_sec` int(16) unsigned DEFAULT NULL COMMENT 'on time for limited discovery state (default 2min)',
  `ble_limited_advert_intervaltime_ms` int(16) unsigned DEFAULT NULL COMMENT 'bt beacon interval in limited discovery state (default 1s)',
  `ble_general_advert_intervaltime_ms` int(16) unsigned DEFAULT NULL COMMENT 'bt beacon interval in general discovery state (default 3s)',
  `ble_lowbatt_advert_intervaltime_ms` int(16) unsigned DEFAULT NULL COMMENT 'bt beacon interval in low battery state (default 5s)',
  `ble_desired_connection_timeout_ms` int(16) unsigned DEFAULT NULL COMMENT 'default 1000',
  `ble_advert_offtime_ms` int(16) unsigned DEFAULT NULL,
  `ble_passkey` int(16) unsigned DEFAULT NULL COMMENT 'bt password',
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_ble_config_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='server access data passed from bt module to the mcu - powerPathBleConfig_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_ble_config`
--

LOCK TABLES `tag_ble_config` WRITE;
/*!40000 ALTER TABLE `tag_ble_config` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_ble_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wifi_network_params`
--

DROP TABLE IF EXISTS `wifi_network_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wifi_network_params` (
  `wifi_network_params_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `server_url` varchar(128) DEFAULT NULL COMMENT 'server url addr where every tag has to go initially to get config data (activation) or cmds (maintenance calls)\n(eg. "www.emanatewireless.com/initconfig',
  `server_ip_addr` varchar(64) DEFAULT NULL,
  `num_dns_servers` int(8) unsigned DEFAULT NULL COMMENT 'max of 2',
  `dns_ip_addr1` varchar(16) DEFAULT NULL COMMENT 'the address should of type "208.67.222.222',
  `dns_ip_addr2` varchar(16) DEFAULT NULL COMMENT 'the address should of type "208.67.222.222',
  `network_name` varchar(32) DEFAULT NULL,
  `network_ssid` varchar(32) DEFAULT NULL,
  `passphrase` varchar(32) DEFAULT NULL COMMENT 'network key',
  `network_security` int(8) DEFAULT NULL COMMENT 'unsigned wpa2 etc - defined in mrvlsdk/incl/sdkwlan.h wlan_security_wep_shared=2, wlan_security_wpa=3, wlan_security_wpa2=4',
  `addr_type` tinyint(1) DEFAULT NULL COMMENT 'unsigned 0 - static ip, 1 - dhcp',
  `tag_static_ip_addr` varchar(16) DEFAULT NULL COMMENT '// (future support for static ip) eg. "192.168.2.100". Ignore for Alpha',
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`wifi_network_params_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='server access data passed from bt module to the mcu - wifiNetworkParams_t (c structure) ';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wifi_network_params`
--

LOCK TABLES `wifi_network_params` WRITE;
/*!40000 ALTER TABLE `wifi_network_params` DISABLE KEYS */;
INSERT INTO `wifi_network_params` VALUES ('29cec003-749a-11e4-a629-000c29609978','cloud.emanatewireless.com',NULL,NULL,NULL,NULL,NULL,'CCF main campus network',NULL,0,NULL,NULL,1,'2014-11-25 17:27:00','2014-11-25 17:27:00',NULL);
/*!40000 ALTER TABLE `wifi_network_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pim_stats_data`
--

DROP TABLE IF EXISTS `pim_stats_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pim_stats_data` (
  `pim_stats_data_recid` varchar(36) NOT NULL COMMENT 'uuid() unique identifier',
  `pim_stats_header_recid` varchar(36) DEFAULT NULL,
  `tag_pim_trig_id_enum` int(4) DEFAULT NULL,
  `plugin_timestamp` datetime DEFAULT NULL COMMENT 'timestamp in ms',
  `plugin_dur_min` int(32) unsigned DEFAULT NULL COMMENT '// Duration of PLUGIN (MIN)',
  `plugin_to_measure_delay_msec` int(16) unsigned DEFAULT NULL COMMENT '// Time in ms from plug in to start of meas.',
  `rms_current` float DEFAULT NULL COMMENT 'rms current over duration (ma)',
  `peak_to_rms` float DEFAULT NULL COMMENT 'peak power to rms ratio',
  `std_dev` float DEFAULT NULL COMMENT 'standard deviation of rms power (ma)',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`pim_stats_data_recid`),
  KEY `fk_pim_stats_header_recid` (`pim_stats_header_recid`),
  CONSTRAINT `fk_pim_stats_header_recid` FOREIGN KEY (`pim_stats_header_recid`) REFERENCES `pim_stats_header` (`pim_stats_header_recid`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='PIM Stats is split into two tables because each pim stats has a header information in pim_stats_header and \nupto 100 data packets info here.\nkeep this data struct 20-bytes (make it easy for BLE) - powerPathPimData_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pim_stats_data`
--

LOCK TABLES `pim_stats_data` WRITE;
/*!40000 ALTER TABLE `pim_stats_data` DISABLE KEYS */;
INSERT INTO `pim_stats_data` VALUES ('0325ebb7-8533-11e4-94af-000c29609978','58144972-9fca-4fb9-94e9-fb7cd437a653',1,'2014-12-16 20:21:27',5,5,10,20,10,'2014-12-16 20:21:27','Node JS'),('0c63d9b9-8533-11e4-94af-000c29609978','58144972-9fca-4fb9-94e9-fb7cd437a653',1,'2014-12-16 20:21:42',15,15,30,30,20,'2014-12-16 20:21:42','Node JS'),('1c41e997-8533-11e4-94af-000c29609978','58144972-9fca-4fb9-94e9-fb7cd437a653',1,'2014-12-16 20:22:09',25,25,30,40,20,'2014-12-16 20:22:09','Node JS'),('2312ab60-113f-4685-8604-f8ba8708d5f8','cc53df48-ba19-47bb-8399-6c782b0be5f0',0,'2014-02-11 20:40:12',330,51792,53724,792,522,'2014-12-16 18:42:17','NodeJS'),('30cc8bc9-8533-11e4-94af-000c29609978','4924819a-09ad-4d6a-936c-8d8e23c865da',1,'2014-12-16 20:22:43',5,5,10,10,10,'2014-12-16 20:22:43','Node JS'),('324b07d6-b21e-4cc9-830e-410427abd79c','cc53df48-ba19-47bb-8399-6c782b0be5f0',0,'2014-11-01 06:40:20',240,32792,23794,45768,798,'2014-12-16 18:42:17','NodeJS'),('67790906-e8bd-4468-8bbc-846bc139085e','eab1b39e-286b-45fb-81d3-743fcb00f29d',1,'2014-11-01 06:40:20',240,32792,23794,45768,798,'2014-12-18 11:32:24','Node JS'),('9bdf41f4-840e-470c-998d-c4828f2660ff','eab1b39e-286b-45fb-81d3-743fcb00f29d',2,'2014-02-11 20:40:12',280,53792,53794,796,536,'2014-12-18 11:32:24','Node JS');
/*!40000 ALTER TABLE `pim_stats_data` ENABLE KEYS */;
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
  `role_name` varchar(50) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
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
INSERT INTO `role_m` VALUES ('1c1404ac-5c47-413a-a925-0e78d8f5ae87','role_id','role10','notes',1,'2014-12-16 15:10:48','2014-12-16 15:10:48','sed data'),('bbc15e7c-b1bf-4b09-8258-900bd1ffe0f5','1','Read only','Read only',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data'),('dbdaf257-28d7-4800-9003-28ae9aa1da34','1','Full','Full',1,'2014-11-07 00:00:00','2014-11-07 00:00:00','Seed Data');
/*!40000 ALTER TABLE `role_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_find_params`
--

DROP TABLE IF EXISTS `tag_find_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_find_params` (
  `tag_find_param_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `buzzer_freq_hz` int(16) unsigned DEFAULT NULL,
  `buzzer_ontime_msec` int(16) unsigned DEFAULT NULL,
  `buzzer_offtime_msec` int(16) unsigned DEFAULT NULL,
  `buzzer_cnt` int(16) unsigned DEFAULT NULL,
  `led_ontime_msec` int(16) unsigned DEFAULT NULL,
  `led_offtime_msec` int(16) unsigned DEFAULT NULL,
  `led_cnt` int(16) unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_find_param_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='config structure from bluetooth device finder. these are the defaults programmed into the tag. \nthe iphone app can modify these defaults per session \nwe also need a max count so the user doesn''t program too big a number\n#define powerpath_max_buzzer_count      1000\n#define powerpath_max_led_count         1000\npowerPathDevFindParam_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_find_params`
--

LOCK TABLES `tag_find_params` WRITE;
/*!40000 ALTER TABLE `tag_find_params` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_find_params` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_util_percent`
--

DROP TABLE IF EXISTS `tag_util_percent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_util_percent` (
  `tag_util_percent_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `util_percent_5min` int(8) unsigned DEFAULT NULL,
  `util_percent_1hr` int(8) unsigned DEFAULT NULL,
  `util_percent_1day` int(8) unsigned DEFAULT NULL,
  `util_percent_1week` int(8) unsigned DEFAULT NULL,
  `util_percent_1month` int(8) unsigned DEFAULT NULL,
  `util_percent_6months` int(8) unsigned DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_util_percent_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='powerpathutilpercent_t (c structure)';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_util_percent`
--

LOCK TABLES `tag_util_percent` WRITE;
/*!40000 ALTER TABLE `tag_util_percent` DISABLE KEYS */;
INSERT INTO `tag_util_percent` VALUES ('2542d6ec-7559-11e4-94a6-000c29609978',50,50,50,50,50,50,1,'2014-11-26 16:13:57','2014-11-26 16:13:57',NULL),('2c281afa-7559-11e4-94a6-000c29609978',70,70,70,70,70,70,1,'2014-11-26 16:14:09','2014-11-26 16:14:09',NULL),('4d75e468-7559-11e4-94a6-000c29609978',80,80,80,80,80,80,1,'2014-11-26 16:15:05','2014-11-26 16:15:05',NULL),('544daec8-7559-11e4-94a6-000c29609978',90,90,90,90,90,90,1,'2014-11-26 16:15:16','2014-11-26 16:15:16',NULL),('5c4589be-7559-11e4-94a6-000c29609978',95,95,95,95,95,95,1,'2014-11-26 16:15:29','2014-11-26 16:15:29',NULL);
/*!40000 ALTER TABLE `tag_util_percent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_m`
--

DROP TABLE IF EXISTS `email_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `email_m` (
  `email_recid` varchar(36) NOT NULL,
  `subject` varchar(200) NOT NULL,
  `to_email` varchar(500) NOT NULL,
  `cc_email` varchar(500) DEFAULT NULL,
  `bcc_email` varchar(500) DEFAULT NULL,
  `from_email` varchar(500) DEFAULT NULL,
  `template_name` varchar(60) DEFAULT NULL,
  `data` varchar(1000) DEFAULT NULL,
  `created_on` varchar(500) NOT NULL,
  `modified_on` datetime NOT NULL,
  `is_sent` tinyint(1) DEFAULT '0' COMMENT '0 - Not sent, 1 - Sent successfully, (-1) - Failed to send ',
  `error_msg` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`email_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_m`
--

LOCK TABLES `email_m` WRITE;
/*!40000 ALTER TABLE `email_m` DISABLE KEYS */;
INSERT INTO `email_m` VALUES ('0a93f5dd-b04d-4fa6-9621-90d1810ffe0e','Welcome to Powerpath','vamsi.m@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Mutyala Industries\",\"username\":\"Vamsi Mutyala\",\"emailID\":\"vamsi.m@osmosys.asia\",\"userID\":\"8595ce42-01e6-4e67-82eb-935b3c7994aa\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:26:58','2014-12-19 18:26:58',1,NULL),('10164fa1-35d5-46eb-b4a1-69819d0d1356','Welcome to Powerpath','gasugar@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"GaryCo\",\"username\":\"Gary Sugar\",\"emailID\":\"gasugar@gmail.com\",\"userID\":\"b44d7f3d-aaa3-4158-be70-73244c0b3eac\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 19:01:18','2014-12-20 19:01:18',-1,NULL),('10765314-1551-46df-ae91-39efaa4a1918','Welcome to Emanate PowerPath','garysugar@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"garysugar@gmail.com\",\"userID\":\"82075206-4de6-4bbf-a342-f1196bb27f3d\",\"organizationName\":\"Reddit\",\"username\":\"Test User\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 14:17:01','2014-12-22 14:17:01',-1,NULL),('148d8386-791b-47f6-91d7-f2c15280d8e8','Welcome to Powerpath','abijeet.p@osmosys.asai','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"The Curly Braces\",\"username\":\"Abijeet Patro\",\"emailID\":\"abijeet.p@osmosys.asai\",\"userID\":\"29f75c46-ac7f-4b44-beba-55819bf52e82\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:07:02','2014-12-19 18:07:02',1,NULL),('22f45df4-ffc3-4cb1-8499-3ea4d533ecc8','Welcome to Emanate PowerPath','1231233123@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"1231233123@gmail.com\",\"userID\":\"f3a145cc-bce6-4b37-bceb-a7d17cbf4382\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"asdasd3\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 09:28:27','2014-12-18 09:28:27',1,NULL),('25c20ec4-db96-440e-b704-00cae16d7efd','Access to Organization - ','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-existing-user','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"acadf237-3ea6-4352-b4c9-219d5dcd8c10\",\"organizationName\":\"Mutyala Industries\",\"username\":\"Abijeet Patro\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:27:42','2014-12-19 18:27:42',1,NULL),('27f6ec43-02d5-4df8-aa58-766ad33dedb7','Welcome to Powerpath','abijeet.p@osmsoys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Reddit\",\"username\":\"Abijeet Patro\",\"emailID\":\"abijeet.p@osmsoys.asia\",\"userID\":\"054ecac9-afdd-4a94-b4fc-6efa1fc5f81e\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 13:00:29','2014-12-19 13:00:29',1,NULL),('2cede950-5352-4423-9d61-3214681c21a3','Emanate Wireless - Password Reset','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','reset-email','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"token\":\"0fa9f1eb996a79f1\",\"tokenExpiry\":6},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 16:28:55','2014-12-22 16:28:55',0,NULL),('2d0c4e80-ddb6-41a1-a9ad-f46851181ecd','Welcome to Powerpath','ndiener@emanatewireless.com','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Emanate Wireless\",\"username\":\"Neil Diener\",\"emailID\":\"ndiener@emanatewireless.com\",\"userID\":\"221a6302-37ca-4622-9fea-232ecdda55b0\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 01:54:12','2014-12-22 01:54:12',-1,NULL),('3498eaf7-cb1b-4758-b711-fba2635ca37e','Access to Organization - ','srinivas.m@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-existing-user','{\"user\":{\"emailID\":\"srinivas.m@osmosys.asia\",\"userID\":\"f5ede1e1-4a49-483c-86a0-76570d6d4b93\",\"organizationName\":\"Osmosys\",\"username\":\"srinivas\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 14:32:13','2014-12-22 14:32:13',-1,NULL),('35c7b1a2-44bc-4046-b6ff-9d82b694c997','Welcome to Emanate PowerPath','reddit@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"reddit@gmail.com\",\"userID\":\"70508e6d-0257-435a-b698-d49326e647d1\",\"organizationName\":\"Osmosys\",\"username\":\"reddit\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 17:54:37','2014-12-19 17:54:37',1,NULL),('3d0b8b89-4b39-4d5c-9cdd-c7d24ef82c38','Access to Organization - ','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-existing-user','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"94404652-4700-4fd6-8d09-be6382fb4c2c\",\"organizationName\":\"Mutyala Industries\",\"username\":\"Abijeet Patro\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:33:45','2014-12-19 18:33:45',1,NULL),('3e65a35f-d198-48ba-a32a-b085dcc16132','Welcome to Emanate PowerPath','2543@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"2543@gmail.com\",\"userID\":\"71ed9add-4e9c-446d-9433-2424d2cb5891\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"42414\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:33:16','2014-12-18 10:33:16',1,NULL),('55dd3218-95d8-4178-b5f6-da313cd6a72d','Welcome to Emanate PowerPath','vamsi.m@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"vamsi.m@osmosys.asia\",\"userID\":\"9a40b0d6-d033-4563-95c9-329d12a0001d\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"Vamsi Mutyala\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 09:30:51','2014-12-18 09:30:51',1,NULL),('5fcf9c3e-a110-4d94-81e2-b282c97d337f','Welcome to Emanate PowerPath','asdasd@dfsdfsd.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"asdasd@dfsdfsd.com\",\"userID\":\"1b20fb08-652a-4b11-8d1c-f7e74bd66585\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"asdasd\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:32:19','2014-12-18 10:32:19',1,NULL),('6277212f-10cc-453f-a623-852f24f71fff','Welcome to Powerpath','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"The Curly Braces\",\"username\":\"Abijeet Patro\",\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"94404652-4700-4fd6-8d09-be6382fb4c2c\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:32:36','2014-12-19 18:32:36',1,NULL),('6c88012a-b107-41a7-8c8d-54abfb20d5e1','Welcome to Emanate PowerPath','salah.s@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"salah.s@osmosys.asia\",\"userID\":\"73f2b79a-eaf2-414a-a64f-b7be0423b241\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"Salah Saleh\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:21:01','2014-12-18 10:21:01',1,NULL),('7d8bfb7f-071d-4a03-a9fc-a8ccae339828','Welcome to Powerpath','garysugar@emanate.com','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Ubisoft\",\"username\":\"Gary Sugar\",\"emailID\":\"garysugar@emanate.com\",\"userID\":\"833a1383-4805-4052-b84c-f045cefca46c\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 15:34:32','2014-12-19 15:34:32',1,NULL),('9000f019-2bde-4603-9073-f159d7143fa9','Emanate Wireless - Password Reset','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"token\":\"a6b1cc116a0d7b4f\",\"tokenExpiry\":6},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 16:19:49','2014-12-22 16:19:49',-1,NULL),('9039b0cb-9a8d-4069-991b-6afd38f372d3','Welcome to Emanate PowerPath','amiya.j@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"amiya.j@osmosys.asia\",\"userID\":\"fd8406c9-0794-4cbb-87a6-77283ba9792a\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"Amiya J\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:26:36','2014-12-18 10:26:36',1,NULL),('9dc9957c-cd83-414f-a5a1-1ef3a4c03c0d','Emanate Wireless - Password Reset','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','reset-email','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"token\":\"3c0ad6c2f55a513b\",\"tokenExpire\":6},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 16:29:38','2014-12-22 16:29:38',0,NULL),('9f165a96-bf9a-484f-ad40-a22ff363ee7f','Emanate Wireless - Password Reset','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','reset-email','{\"user\":{\"emailID\":\"abijeet.p@osmosys.asia\",\"token\":\"8984c38f3769ccad\",\"tokenExpiry\":6},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 16:24:55','2014-12-22 16:24:55',0,NULL),('a8fc043c-52a5-4a44-97bf-578dd1d20efb','Welcome to Emanate PowerPath','thesquarebrackets@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"thesquarebrackets@gmail.com\",\"userID\":\"48fe56d8-e1c6-48a7-aa3b-1f71c5f4da9c\",\"organizationName\":\"The Curly Braces\",\"username\":\"The Squarish Brackets\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 12:40:24','2014-12-20 12:40:24',-1,NULL),('a926237a-e4d0-42e7-95a2-cc493b05bcb9','Welcome to Emanate PowerPath','sampathkumar.g@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"sampathkumar.g@osmosys.asia\",\"userID\":\"ad33f40d-dca0-4115-8452-7f395c359080\",\"organizationName\":\"Mutyala Industries\",\"username\":\"Sampath Kumar\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 06:18:59','2014-12-20 06:18:59',-1,NULL),('adc1abdd-8258-41ff-ad97-df5592e86140','Welcome to Powerpath','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"The Curly Braces\",\"username\":\"Abijeet\",\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"3f2d3107-fd65-434b-9ef1-6a3e6cad10de\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 12:45:45','2014-12-19 12:45:45',1,NULL),('b0833cef-0d22-408a-a48d-792022d414b8','Welcome to Emanate PowerPath','facebok@gmail.com','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"facebok@gmail.com\",\"userID\":\"c9ab39e7-92ba-407e-a7c1-f8eb30ae7cf2\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"facebook\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:36:35','2014-12-18 10:36:35',1,NULL),('b4474149-72ee-401e-a184-65c9793ebce3','Welcome to Powerpath','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Osmosys\",\"username\":\"Abijeet Patro\",\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"acadf237-3ea6-4352-b4c9-219d5dcd8c10\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 13:18:57','2014-12-19 13:18:57',1,NULL),('bd420451-68ce-476c-9048-74a91a39bb58','Welcome to Emanate PowerPath','saroja.k@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"saroja.k@osmosys.asia\",\"userID\":\"51aea7b3-18cd-459a-bc62-d12a029f7a04\",\"organizationName\":\"Mutyala Industries\",\"username\":\"Saroja\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 12:00:52','2014-12-20 12:00:52',-1,NULL),('ca59c508-5909-4a68-a5f7-b95d8e20e47a','Welcome to Powerpath','gsugar@emanatewireless.com','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Emanate\",\"username\":\"Gary Sugar\",\"emailID\":\"gsugar@emanatewireless.com\",\"userID\":\"627786a9-2fb3-4e45-9fc7-e6f7aef605cc\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-22 16:22:28','2014-12-22 16:22:28',-1,NULL),('cecb14a4-0083-4124-9f2f-2ebb5dbd2b8c','Welcome to Powerpath','vamsi.m@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Mutyala Industries\",\"username\":\"Vamsi Mutyala\",\"emailID\":\"vamsi.m@osmosys.asia\",\"userID\":\"b55600fd-60ec-4ce8-86d4-9bf0e7894168\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 18:33:11','2014-12-19 18:33:11',1,NULL),('d2ec8387-ca37-4756-9e78-aa1c3edab0c5','Welcome to Emanate PowerPath','reddit.d@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"reddit.d@osmosys.asia\",\"userID\":\"9bce0122-5247-4697-9c7d-7f8c2af0a06b\",\"organizationName\":\"The Pandora\'s Box\",\"username\":\"reddit.d\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-18 10:29:39','2014-12-18 10:29:39',1,NULL),('f1e8954f-70dc-4ba0-a61a-7c925c7820cc','Welcome to Powerpath','bhardwaja.g@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Gunmadi Guns and Foundries\",\"username\":\"Bhardwaj Gunmadi\",\"emailID\":\"bhardwaja.g@osmosys.asia\",\"userID\":\"879e79ba-05f1-487c-9f4a-7eac53047ae1\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-19 11:23:35','2014-12-19 11:23:35',1,NULL),('f595dab0-408b-4f13-bf9b-69b62823d596','Welcome to Emanate PowerPath','genpack@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"genpack@osmosys.asia\",\"userID\":\"cee2b7ea-9a46-48e5-a938-d3e8c8b3fead\",\"organizationName\":\"The Curly Braces\",\"username\":\"Genpack\"},\"email\":{\"baseURL\":\"http://10.0.0.15:3000/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 12:12:34','2014-12-20 12:12:34',-1,NULL),('f9e0103c-c942-4219-9940-6beb570d4ce4','Welcome to Powerpath','abijeet.p@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"The Curly Braces\",\"username\":\"Abijeet Patro\",\"emailID\":\"abijeet.p@osmosys.asia\",\"userID\":\"dcd91a23-dbb2-4705-8a87-de69d43ec08e\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 12:39:50','2014-12-20 12:39:50',-1,NULL),('fc386a5c-1e45-4f26-ba27-53a57fb15d48','Welcome to Emanate PowerPath','championworks@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','add-new-user','{\"user\":{\"emailID\":\"championworks@osmosys.asia\",\"userID\":\"9aa236a2-d6e1-42f1-8deb-77f2972850de\",\"organizationName\":\"Mutyala Industries\",\"username\":\"Champion works\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 12:38:41','2014-12-20 12:38:41',-1,NULL),('fdbe30d3-2363-4e9c-85f8-d05311a942fc','Welcome to Powerpath','srinivas.m@osmosys.asia','','','Emanate Wireless <emanate@osmosys.asia>','welcome-email','{\"user\":{\"organizationName\":\"Osmosys\",\"username\":\"srinivas\",\"emailID\":\"srinivas.m@osmosys.asia\",\"userID\":\"f5ede1e1-4a49-483c-86a0-76570d6d4b93\"},\"email\":{\"baseURL\":\"http://183.82.96.65:8888/\",\"fromName\":\"Emanate Wireless\"}}','2014-12-20 13:02:05','2014-12-20 13:02:05',-1,NULL);
/*!40000 ALTER TABLE `email_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license_m`
--

DROP TABLE IF EXISTS `license_m`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `license_m` (
  `license_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `license_name` varchar(100) NOT NULL,
  `max_tags` int(8) DEFAULT NULL,
  `max_users` int(4) DEFAULT NULL,
  `max_deployments` int(2) DEFAULT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`license_recid`),
  UNIQUE KEY `license_name` (`license_name`),
  UNIQUE KEY `license_name_2` (`license_name`)
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
-- Table structure for table `tag_hist_data`
--

DROP TABLE IF EXISTS `tag_hist_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_hist_data` (
  `tag_hist_data_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL,
  `tag_srno` varchar(100) DEFAULT NULL,
  `organization_id` varchar(32) DEFAULT NULL,
  `start_timestamp` datetime DEFAULT NULL,
  `hist_data` varchar(900) DEFAULT NULL COMMENT 'Comma separated samples// array of 100 samples',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tag_hist_data_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='// This IS the response TO the command: POWERPATH_REPORT_HIST_DATA with lookup_key = ''powerPathCmds''';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_hist_data`
--

LOCK TABLES `tag_hist_data` WRITE;
/*!40000 ALTER TABLE `tag_hist_data` DISABLE KEYS */;
INSERT INTO `tag_hist_data` VALUES ('37dbbace-9574-4420-8b7f-393569b77883','891ad2a4-3828-4026-bbda-e7b69664dbfb','tag3-GE-10001','3','2014-11-10 04:48:10','12,203,345','2014-12-16 11:37:45','NodeJS'),('4cd38211-998d-4a7e-b3c0-20db231a9321','a75f3243-bcb1-4f50-bf31-50557e60f3c4','3','3','2014-11-10 04:48:10','12,203,345','2014-12-18 11:33:07','Node JS'),('5b237af5-64b7-402c-af38-cccbc2ab50d1','77aa9832-7a79-4dd8-8a70-a5ee103d2fad','tag3-GE-10001','3','2014-11-10 04:48:10','12,203,345','0000-00-00 00:00:00','NodeJS'),('76e3976c-fc48-4584-9fd7-a01d68b33a7f','5c54dffd-b8e8-4b7d-834f-d1e4529de505','tag3-GE-10001','3','2014-11-10 04:48:10','12,203,345','2014-12-15 09:36:32','NodeJS'),('8eda2d91-3b5a-4ae0-839f-1f05220b7916','5fdb8fbc-4261-4e43-857d-83ba4a24b9cb','3','12','2013-05-19 04:25:00','12,34,405','0000-00-00 00:00:00','NodeJS'),('9e04e3b2-11e8-4ac3-947a-4771ac0c1dc0','193be7dd-63dc-4256-bc3b-d4c7fa5390aa','3','12','2013-05-19 04:25:00','12,34,405','2014-12-16 11:22:40','NodeJS'),('ba356921-fd8a-467a-8203-bb3dd1cecf00','ef0a8bdc-ab22-453b-bf70-13086dbdaa85','3','12','2013-05-19 04:25:00','12,34,405','2014-12-18 07:04:55','Node JS'),('e2cda376-0daa-4b15-95ff-e9ab62c5e462','51f7f617-e7b4-4095-8e93-281507da8829','tag3-GE-10001','3','2014-11-10 04:48:10','12,203,345','0000-00-00 00:00:00','NodeJS'),('e9c10cde-aec0-4872-8017-04c9f955079a','5adb0922-f131-49db-a398-f2e8c049b216','tag3-GE-10001','3','2014-11-10 04:48:10','12,203,345','2014-12-15 12:56:47','NodeJS');
/*!40000 ALTER TABLE `tag_hist_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_debug_info`
--

DROP TABLE IF EXISTS `tag_debug_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_debug_info` (
  `tag_debug_info_recid` varchar(36) NOT NULL COMMENT 'uuid() unique identifier',
  `cassandra_dump_rec_id` varchar(36) DEFAULT NULL COMMENT 'references cassandra dump recid, incase data is inserted/ updated by Node JS',
  `tag_srno` varchar(100) DEFAULT NULL COMMENT 'References tag_info.tag_serial_num',
  `organization_id` varchar(32) DEFAULT NULL COMMENT 'References tag_info.organization_id',
  `curr_timestamp` datetime DEFAULT NULL,
  `str_len` int(16) unsigned DEFAULT NULL COMMENT 'length of the debug string <= MAX_DELOG_SIZE (2048) ',
  `debug_str` varchar(1000) DEFAULT NULL,
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`tag_debug_info_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='// This is a debug string sent in response to the command\n// POWERPATH_SEND_DEBUG_LOG. The tag will be storing free form text\n// with debug info';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_debug_info`
--

LOCK TABLES `tag_debug_info` WRITE;
/*!40000 ALTER TABLE `tag_debug_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_debug_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_config_params`
--

DROP TABLE IF EXISTS `tag_config_params`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_config_params` (
  `tag_config_params_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `version_num` int(16) unsigned DEFAULT NULL,
  `device_type_recid` varchar(36) DEFAULT NULL,
  `customer_id` int(32) unsigned DEFAULT NULL COMMENT '// unique customerID',
  `url_home` varchar(128) DEFAULT NULL COMMENT '// url address for commands every maintenance interval',
  `wifi_network_params_recid` varchar(36) DEFAULT NULL,
  `push_button_actions` int(4) DEFAULT NULL COMMENT '// enable blink/maint call when button is pressed',
  `min_maint_interval_sec` int(16) unsigned DEFAULT NULL COMMENT '// min time between maint intervals // there will be exceptions (when the tag is unplugged and there were CCX events during the plugged-in state we will force a call',
  `maint_interval_pluggedin_sec` int(16) unsigned DEFAULT NULL COMMENT 'maintenance interval (hours) when plugged in - default 1hr',
  `maint_interval_unplugged_sec` int(16) unsigned DEFAULT NULL COMMENT 'maintenance interval (hours) when unplugged - default 24hrs',
  `maint_interval_lowbatt_sec` int(16) unsigned DEFAULT NULL COMMENT 'maintenance interval (hours) when plugged in - default 1hr',
  `pluggedin_actions` int(8) unsigned DEFAULT NULL COMMENT 'enable blink/maint call when plugged in bitmapp: blink (0), maint call (1)',
  `unplugged_actions` int(8) DEFAULT NULL COMMENT '// enable blink/maint call when unplugged  // powerPathActions_t (bitmap) - default ON',
  `regulatory_domain_id_enum` int(4) DEFAULT NULL,
  `ccx_vendor_id` int(8) unsigned DEFAULT NULL COMMENT '// ccxVendorId_t: Only Cisco CCX = 0 for now',
  `wifi_ccx_channels` int(16) unsigned DEFAULT NULL COMMENT '// bit mapped from 1-12 (for example 0x02 transmits on channel 1)',
  `ccx_battery_report_option` int(8) unsigned DEFAULT NULL COMMENT '// CCX battery reporting options (ccxBatteryReportOption_t)',
  `ccx_report_options` int(8) unsigned DEFAULT NULL COMMENT '// CCX battery reporting options (ccxReportEnable_t)',
  `min_beacon_interval_sec` int(16) unsigned DEFAULT NULL COMMENT '// min time between beaconing intervals\n								         // there will be exceptions (when the tag is unplugged and there were\n								         // CCX events during the plugged-in state we will force a beacon',
  `wifi_pluggedin_beacon_interval_sec` int(16) unsigned DEFAULT NULL COMMENT 'wifi beaconing interval for ccx (default 5min)',
  `wifi_unplugged_beacon_interval_sec` int(16) unsigned DEFAULT NULL COMMENT 'wifi beaconing interval for ccx (default 5min)',
  `wifi_lowbatt_beacon_interval_sec` int(16) unsigned DEFAULT NULL COMMENT 'wifi beaconing interval for ccx in low battery mode (default 10min)',
  `wifi_num_pkts_per_chan` int(8) unsigned DEFAULT NULL COMMENT '// # of repeatitions in each channel (default 3)\n                                              // if channels 1, 6 and 11 are configured then the pkts will go out as\n                                              // [pkt0, pkt1, pkt2] on channel 1, followed by // [pkt0, pkt1, pkt2] on channel 6, and so on',
  `wifi_tx_power_dbm` int(8) unsigned DEFAULT NULL COMMENT '// 0 - 12 (need to map it to dBm). default is 12',
  `accel_enable` int(8) unsigned DEFAULT NULL COMMENT '// Enable/disable accelerometer and select update flags\n                                               // bitmap: enableAccel (0), enable blink at start(1), during(2), end(3). // default: 0xf',
  `accel_motion_time_sec` int(8) unsigned DEFAULT NULL COMMENT '// Amount of time accel is detected before triggering a blink broadcast (1s)',
  `accel_motion_update_sec` int(8) unsigned DEFAULT NULL COMMENT '// Blink interval when tag is in motion (3s)',
  `ir_enable` int(8) unsigned DEFAULT NULL COMMENT '// enable IR // bitmap: enable (0), sendBlink on chokepoint det (1)',
  `lf_enable` int(8) unsigned DEFAULT NULL COMMENT '// enable IR // bitmap: enable (0), sendBlink on chokepoint det (1)',
  `tamper_det_enable` int(8) unsigned DEFAULT NULL COMMENT '// enable tamper det // bitmap: enable (0), sendBlink on tamper det (1)',
  `pkt_spacing_ms` int(8) unsigned DEFAULT NULL COMMENT 'ccx pkt spacing on each channel',
  `tag_ble_config_recid` varchar(36) DEFAULT NULL,
  `tag_find_param_recid` varchar(36) DEFAULT NULL,
  `current_meas_en` int(8) unsigned DEFAULT NULL COMMENT '// current meas enable',
  `tag_current_thresh_recid` varchar(36) DEFAULT NULL,
  `max_current_samples` int(16) unsigned DEFAULT NULL COMMENT 'up to max_current_current_samples - 1024 (defined as constant in .h file)',
  `tag_hist_reset_rule_id_enum` int(4) DEFAULT NULL,
  `hist_config_enable` int(8) unsigned DEFAULT NULL,
  `hist_thresh_1` int(16) unsigned DEFAULT NULL COMMENT 'hist thresholds (defaults - tbd)',
  `hist_thresh_2` int(16) unsigned DEFAULT NULL COMMENT 'hist thresholds (defaults - tbd)',
  `hist_thresh_3` int(16) unsigned DEFAULT NULL COMMENT 'hist thresholds (defaults - tbd)',
  `tag_pim_config_recid` varchar(36) DEFAULT NULL,
  `max_pim_current_samples` int(16) unsigned DEFAULT NULL COMMENT 'up to max_current_pim_current_samples - 1024 (defined as constant in .h file)',
  `tag_battery_config_recid` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`tag_config_params_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='tag configuration parameters - references tag_info, tag_util_percent, tag_ble_events - powerpathmaint_t (c structure) references:powerpathinfo_t, powerpathutilpercent_t, powerpathbleevents_t';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_config_params`
--

LOCK TABLES `tag_config_params` WRITE;
/*!40000 ALTER TABLE `tag_config_params` DISABLE KEYS */;
/*!40000 ALTER TABLE `tag_config_params` ENABLE KEYS */;
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
  `is_Active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`deployment_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `deployment_m`
--

LOCK TABLES `deployment_m` WRITE;
/*!40000 ALTER TABLE `deployment_m` DISABLE KEYS */;
/*!40000 ALTER TABLE `deployment_m` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `device_types`
--

DROP TABLE IF EXISTS `device_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `device_types` (
  `device_type_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `device_id` varchar(100) DEFAULT NULL,
  `device_type_id_enum` int(4) DEFAULT NULL,
  `device_name` varchar(64) DEFAULT NULL,
  `model_number` varchar(16) DEFAULT NULL,
  `serial_number` varchar(16) DEFAULT NULL,
  `manufacturer_name` varchar(32) DEFAULT NULL,
  `device_desc` varchar(128) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `modified_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'modified on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`device_type_recid`),
  UNIQUE KEY `uk_device_id` (`device_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='asset/ device details';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `device_types`
--

LOCK TABLES `device_types` WRITE;
/*!40000 ALTER TABLE `device_types` DISABLE KEYS */;
INSERT INTO `device_types` VALUES ('2a57de6a-7550-11e4-94a6-000c29609978','syringe pump manufacturer-1002',3,'syringe pump','Model 1','1002','syringe pump manufacturer','syringe pump',1,'2014-11-26 15:09:40','2014-11-26 15:09:40','Test data'),('40d4e025-7550-11e4-94a6-000c29609978','anaesthetic agent monitor-1002',3,'anaesthetic agent monitor','Model 1','1002','anaesthetic agent monitor manufa','anaesthetic agent monitor',1,'2014-11-26 15:10:18','2014-11-26 15:10:18','Test data'),('4540f8c0-754f-11e4-94a6-000c29609978','BED-Sleepwell-1002',3,'BED','Model 1','1002','Slepwell','Bed',1,'2014-11-26 15:03:16','2014-11-26 15:03:16','Test data'),('4d2ab6ae-74a7-11e4-a629-000c29609978','',14,NULL,'model1',NULL,'GE dash 3k',NULL,1,'2014-11-25 19:01:03','2014-11-25 19:01:03',NULL),('559f6ad7-7550-11e4-94a6-000c29609978','fetal monitor-1002',3,'fetal monitor','Model 1','1002','fetal monitor manufacturer','fetal monitor',1,'2014-11-26 15:10:53','2014-11-26 15:10:53','Test data'),('6a50fe06-754f-11e4-94a6-000c29609978','WORKSTATION_ON_WHEEL-Sleepwell',3,'WORKSTATION_ON_WHEEL','Model 1','1002','WORKSTATION_ON_WHEEL manufacture','WORKSTATION_ON_WHEEL',1,'2014-11-26 15:04:18','2014-11-26 15:04:18','Test data'),('6d59ed5e-7550-11e4-94a6-000c29609978','neonatal monitor-1002',3,'neonatal monitor','Model 1','1002','neonatal monitor manufacturer','neonatal monitor',1,'2014-11-26 15:11:33','2014-11-26 15:11:33','Test data'),('bd0f9bbe-754f-11e4-94a6-000c29609978','balloon pump-balloon pump manu',3,'balloon pump','Model 1','1002','balloon pump manufacturer','balloon pump',1,'2014-11-26 15:06:37','2014-11-26 15:06:37','Test data'),('e17a9142-754f-11e4-94a6-000c29609978','pediatric vlumetric_pump-pedia',3,'pediatric vlumetric_pump','Model 1','1002','pediatric vlumetric_pump manufac','pediatric vlumetric_pump-pediatric',1,'2014-11-26 15:07:38','2014-11-26 15:07:38','Test data'),('fba26734-754f-11e4-94a6-000c29609978','enteral infusion pump-enteral ',3,'enteral infusion pump','Model 1','1002','enteral infusion pump manufactur','enteral infusion pump',1,'2014-11-26 15:08:22','2014-11-26 15:08:22','Test data');
/*!40000 ALTER TABLE `device_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag_lookup_table`
--

DROP TABLE IF EXISTS `tag_lookup_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag_lookup_table` (
  `Lookup_RecId` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `Lookup_Key` varchar(50) DEFAULT NULL,
  `Lookup_value_id` int(4) unsigned DEFAULT NULL,
  `Lookup_value_int` int(36) unsigned DEFAULT NULL,
  `Lookup_value_vc` varchar(100) DEFAULT NULL,
  `lookup_value_display` varchar(100) DEFAULT NULL,
  `lookup_value_desc` varchar(500) DEFAULT NULL,
  `Is_Active` char(1) DEFAULT NULL,
  `Created_On` datetime DEFAULT NULL,
  `Created_By` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Lookup_RecId`),
  UNIQUE KEY `Lookup_Key` (`Lookup_Key`,`Lookup_value_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag_lookup_table`
--

LOCK TABLES `tag_lookup_table` WRITE;
/*!40000 ALTER TABLE `tag_lookup_table` DISABLE KEYS */;
INSERT INTO `tag_lookup_table` VALUES ('3b3b83aa-7168-11e4-996f-000c29609978','powerPathAssetType',1,NULL,'BED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8811-7168-11e4-996f-000c29609978','powerPathAssetType',2,NULL,'WORKSTATION_ON_WHEEL',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b88c7-7168-11e4-996f-000c29609978','powerPathAssetType',3,NULL,'BALLOON_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b890f-7168-11e4-996f-000c29609978','powerPathAssetType',4,NULL,'BREAST_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8951-7168-11e4-996f-000c29609978','powerPathAssetType',5,NULL,'PCA_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b89a4-7168-11e4-996f-000c29609978','powerPathAssetType',6,NULL,'ENTERAL_FEEDING_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b89f9-7168-11e4-996f-000c29609978','powerPathAssetType',7,NULL,'INFUSION_PUMPS_SINGLE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8a46-7168-11e4-996f-000c29609978','powerPathAssetType',8,NULL,'INFUSION_PUMPS_DOUBLE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8a9b-7168-11e4-996f-000c29609978','powerPathAssetType',9,NULL,'INFUSION_PUMPS_OTHER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8b4b-7168-11e4-996f-000c29609978','powerPathAssetType',10,NULL,'ADULT_VOLUMETRIC_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8c06-7168-11e4-996f-000c29609978','powerPathAssetType',11,NULL,'PEDIATRIC_VLUMETRIC_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8c52-7168-11e4-996f-000c29609978','powerPathAssetType',12,NULL,'ENTERAL_INFUSION_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8c8e-7168-11e4-996f-000c29609978','powerPathAssetType',13,NULL,'LYMPHEDEMA_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8cc9-7168-11e4-996f-000c29609978','powerPathAssetType',14,NULL,'PATIENT_CONTROLLED_ANALGESIA_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8d03-7168-11e4-996f-000c29609978','powerPathAssetType',15,NULL,'SYRINGE_PUMP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8d3b-7168-11e4-996f-000c29609978','powerPathAssetType',16,NULL,'PUMP_OTHER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8d75-7168-11e4-996f-000c29609978','powerPathAssetType',17,NULL,'ANAESTHETIC_AGENT_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8db2-7168-11e4-996f-000c29609978','powerPathAssetType',18,NULL,'APNEA_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8de8-7168-11e4-996f-000c29609978','powerPathAssetType',19,NULL,'END_TIDAL_CO2_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8e22-7168-11e4-996f-000c29609978','powerPathAssetType',20,NULL,'FETAL_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8e5a-7168-11e4-996f-000c29609978','powerPathAssetType',21,NULL,'NEONATAL_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8e90-7168-11e4-996f-000c29609978','powerPathAssetType',22,NULL,'PO2_CO2_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8ec7-7168-11e4-996f-000c29609978','powerPathAssetType',23,NULL,'SURGICAL_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8eff-7168-11e4-996f-000c29609978','powerPathAssetType',24,NULL,'TELEMETRY_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8f39-7168-11e4-996f-000c29609978','powerPathAssetType',25,NULL,'URINE_OUTPUT_TEMPERATURE_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8f71-7168-11e4-996f-000c29609978','powerPathAssetType',26,NULL,'VITAL_SIGNS_MONITOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b8fc1-7168-11e4-996f-000c29609978','powerPathAssetType',27,NULL,'SCOPE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9000-7168-11e4-996f-000c29609978','powerPathAssetType',28,NULL,'MONITOR_OTHER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b903b-7168-11e4-996f-000c29609978','powerPathAssetType',29,NULL,'ECG',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9070-7168-11e4-996f-000c29609978','powerPathAssetType',30,NULL,'SEQUENTIAL_COMPRESSION_DEVICE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b90ac-7168-11e4-996f-000c29609978','powerPathAssetType',31,NULL,'ULTRASOUND_MACHINE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b90e5-7168-11e4-996f-000c29609978','powerPathAssetType',32,NULL,'VENTILLATOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9124-7168-11e4-996f-000c29609978','powerPathAssetType',33,NULL,'WOUND_VAC',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b932f-7168-11e4-996f-000c29609978','powerPathAssetType',34,NULL,'ALT_PRESSURE_FLOATATION_DEVICE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b936f-7168-11e4-996f-000c29609978','powerPathAssetType',35,NULL,'ANAESTHESIA_MACHINE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b93a3-7168-11e4-996f-000c29609978','powerPathAssetType',36,NULL,'BLOOD_FLUID_WARMER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b93db-7168-11e4-996f-000c29609978','powerPathAssetType',37,NULL,'COLD_THERAPY_UNIT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9413-7168-11e4-996f-000c29609978','powerPathAssetType',38,NULL,'INFUSION_CONTROLLER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9448-7168-11e4-996f-000c29609978','powerPathAssetType',39,NULL,'DEFRIBRILLATOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b947e-7168-11e4-996f-000c29609978','powerPathAssetType',40,NULL,'ELECTROSURGICAL_GENERATOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b94b5-7168-11e4-996f-000c29609978','powerPathAssetType',41,NULL,'HEAT_THERAPY_UNIT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b94ec-7168-11e4-996f-000c29609978','powerPathAssetType',42,NULL,'HYPER_HYPOTHERMIA_UNIT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9523-7168-11e4-996f-000c29609978','powerPathAssetType',43,NULL,'SUCTION_DEVICE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9559-7168-11e4-996f-000c29609978','powerPathAssetType',44,NULL,'ULTRASONIC_NEBULIZER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9590-7168-11e4-996f-000c29609978','powerPathAssetType',45,NULL,'RECORDER_AND_PRINTER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b95c8-7168-11e4-996f-000c29609978','powerPathAssetType',46,NULL,'CARDIAC_CARE_SYSTEM',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b95fe-7168-11e4-996f-000c29609978','powerPathAssetType',47,NULL,'INTENSIVE_CARE_SYSTEM',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9634-7168-11e4-996f-000c29609978','powerPathAssetType',48,NULL,'PACU_SYSTEM',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b966b-7168-11e4-996f-000c29609978','powerPathAssetType',49,NULL,'NICU_SYSTEM',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b96a1-7168-11e4-996f-000c29609978','powerPathAssetType',50,NULL,'ER_SYSTEM',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b96d7-7168-11e4-996f-000c29609978','powerPathAssetType',51,NULL,'AEROSOL_TENT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b970d-7168-11e4-996f-000c29609978','powerPathAssetType',52,NULL,'AIR_COMPRESSOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9743-7168-11e4-996f-000c29609978','powerPathAssetType',53,NULL,'BIPAP',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9777-7168-11e4-996f-000c29609978','powerPathAssetType',54,NULL,'HEATING_HUMIDIFIER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b97ad-7168-11e4-996f-000c29609978','powerPathAssetType',55,NULL,'OXYGEN_CONCENTRATOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b97e1-7168-11e4-996f-000c29609978','powerPathAssetType',56,NULL,'INCUBATOR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9819-7168-11e4-996f-000c29609978','powerPathAssetType',57,NULL,'INFANT_WARMER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b984e-7168-11e4-996f-000c29609978','powerPathAssetType',58,NULL,'PHOTOTHERAPY_DEVICE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9883-7168-11e4-996f-000c29609978','powerPathSystemEvents',1,0,'POWERPATH_SYSTEM_REBOOT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b98bc-7168-11e4-996f-000c29609978','powerPathSystemEvents',2,1,'POWERPATH_UNKNOWN_SERVER_COMMAND',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b98f9-7168-11e4-996f-000c29609978','powerPathSystemEvents',3,2,'POWERPATH_REVERTING_OLD_FIRMWARE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9930-7168-11e4-996f-000c29609978','powerPathSystemEvents',4,3,'POWERPATH_ERROR_CONNECTING_TO_WIFI_NETWORK',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9968-7168-11e4-996f-000c29609978','powerPathSystemEvents',5,4,'POWERPATH_ERROR_PERIPHERAL_NOT_RESPONDING',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b99a0-7168-11e4-996f-000c29609978','powerPathSystemEvents',6,5,'POWERPATH_ERROR_BATTERY_LEVEL_ALERT',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b99db-7168-11e4-996f-000c29609978','powerPathSystemEvents',7,6,'POWERPATH_MALLOC_ERROR',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9a11-7168-11e4-996f-000c29609978','powerPathSystemEvents',8,7,'POWERPATH_BLE_CONNECT_FAILED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9f86-7168-11e4-996f-000c29609978','powerPathHistReset',1,0,'POWERPATH_RESET_HISTOGRAM_AT_END_MAINT_CALL',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3b9fc4-7168-11e4-996f-000c29609978','powerPathHistReset',2,1,'POWERPATH_RESET_HISTOGRAM_24HRS',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba000-7168-11e4-996f-000c29609978','powerPathConfigState',1,0,'TAG_CONFIG_STATE_NOT_COMMISSIONED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba03b-7168-11e4-996f-000c29609978','powerPathConfigState',2,1,'TAG_CONFIG_STATE_ACTIVATED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba079-7168-11e4-996f-000c29609978','powerPathConfigState',3,2,'TAG_CONFIG_STATE_CONFIGURED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba0b6-7168-11e4-996f-000c29609978','powerPathConfigState',4,3,'TAG_CONFIG_STATE_DECOMMISSIONED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba0f5-7168-11e4-996f-000c29609978','powerPathRegDomain',1,30783030,'REG_OTHER',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba139-7168-11e4-996f-000c29609978','powerPathRegDomain',2,30783130,'REG_FCC',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba17c-7168-11e4-996f-000c29609978','powerPathRegDomain',3,30783230,'REG_IC',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba325-7168-11e4-996f-000c29609978','powerPathRegDomain',4,30783330,'REG_ETSI',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba36d-7168-11e4-996f-000c29609978','powerPathRegDomain',5,30783331,'REG_SPAIN',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba3b1-7168-11e4-996f-000c29609978','powerPathRegDomain',6,30783332,'REG_FRANCE',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba3eb-7168-11e4-996f-000c29609978','powerPathRegDomain',7,30783430,'REG_JAPAN',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba427-7168-11e4-996f-000c29609978','powerPathRegDomain',8,30783431,'REG_JAPAN1',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba462-7168-11e4-996f-000c29609978','powerPathRegDomain',9,30783530,'REG_CHINA',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba4e5-7168-11e4-996f-000c29609978','powerPathPimTrig',1,0,'POWERPATH_PIM_TRIG_ELAPSED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba526-7168-11e4-996f-000c29609978','powerPathPimTrig',2,1,'POWERPATH_PIM_TRIG_RMS_P2P',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba567-7168-11e4-996f-000c29609978','powerPathPimTrig',3,2,'POWERPATH_PIM_TRIG_COMB',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba5a7-7168-11e4-996f-000c29609978','powerPathPimTrig',4,3,'POWERPATH_PIM_TRIG_SEQ_COMB',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba5e9-7168-11e4-996f-000c29609978','powerPathUsageInfo',1,0,'POWERPATH_UNPLUGGED',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba625-7168-11e4-996f-000c29609978','powerPathUsageInfo',2,1,'POWERPATH_PLUGGED_IN_OFF','Not used',NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba665-7168-11e4-996f-000c29609978','powerPathUsageInfo',3,2,'POWERPATH_PLUGGED_IN_NOT_USED','Plugged in, idle',NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba6a0-7168-11e4-996f-000c29609978','powerPathUsageInfo',4,3,'POWERPATH_PLUGGED_IN_AND_USED','Used',NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba6da-7168-11e4-996f-000c29609978','powerPathUsageInfo',5,4,'POWERPATH_PLUGGED_IN_AND_UNKNOWN',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('3b3ba719-7168-11e4-996f-000c29609978','powerPathUsageInfo',6,5,'POWERPATH_UNPLUGGED_LOW_BATTERY',NULL,NULL,'1','2014-11-21 00:00:00','Seed Data'),('43343339-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',1,0,'POWERPATH_MAINT_MAJOR_ERROR',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('43343559-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',2,0,'POWERPATH_MAINT_MINOR_ERROR',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('433435db-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',3,0,'POWERPATH_MAINT_ACTIVATED',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('4334363d-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',4,0,'POWERPATH_MAINT_PERIODIC_PLUGGED_IN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('43343699-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',5,0,'POWERPATH_MAINT_PERIODIC_UNPLUGGED',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('433436f5-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',6,0,'POWERPATH_MAINT_AC_PLUGGED_IN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('4334373e-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',7,0,'POWERPATH_MAINT_AC_UNPLUGGED',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('433437a7-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',8,0,'POWERPATH_MAINT_CALL_BUTTON_PRESSED',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('433437e6-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',9,0,'POWERPATH_MAINT_MOTION_START',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('43343822-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',10,0,'POWERPATH_MAINT_IN_MOTION',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('4334385a-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',11,0,'POWERPATH_MAINT_MOTION_END',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('43343893-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',12,0,'POWERPATH_MAINT_TAMPER_DET',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('433438cd-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',13,0,'POWERPATH_MAINT_BT_CHOKEPOINT_DET',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('4334390a-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',14,0,'POWERPATH_MAINT_LF_CHOKEPOINT_DET',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('43343942-794e-11e4-94ec-e96d67bd7d3d','powerPathCCXMaintReason',15,0,'POWERPATH_MAINT_IR_CHOKEPOINT_DET',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('8177d3ec-7ede-11e4-8b2c-000c29609978','powerPathCmds',1,NULL,'POWERPATH_NO_COMMANDS',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d633-7ede-11e4-8b2c-000c29609978','powerPathCmds',2,NULL,'POWERPATH_ECHO_COMMAND',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d6b2-7ede-11e4-8b2c-000c29609978','powerPathCmds',3,NULL,'POWERPATH_TAG_NOT_COMMISSIONED',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d71f-7ede-11e4-8b2c-000c29609978','powerPathCmds',4,NULL,'POWERPATH_UPDATE_MCU_FIRMWARE',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d78f-7ede-11e4-8b2c-000c29609978','powerPathCmds',5,NULL,'POWERPATH_UPDATE_WIFI_FIRMWARE',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d80c-7ede-11e4-8b2c-000c29609978','powerPathCmds',6,NULL,'POWERPATH_UPDATE_BLE_FIRMWARE',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d861-7ede-11e4-8b2c-000c29609978','powerPathCmds',7,NULL,'POWERPATH_UPDATE_CONFIG_PARAM',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d8c3-7ede-11e4-8b2c-000c29609978','powerPathCmds',8,NULL,'POWERPATH_REPORT_LOG_EVENTS',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d906-7ede-11e4-8b2c-000c29609978','powerPathCmds',9,NULL,'POWERPATH_SEND_DEBUG_LOG',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d942-7ede-11e4-8b2c-000c29609978','powerPathCmds',10,NULL,'POWERPATH_REPORT_CURRENT_UTIL_DATA',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177d97f-7ede-11e4-8b2c-000c29609978','powerPathCmds',11,NULL,'POWERPATH_REPORT_HIST_DATA',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177e680-7ede-11e4-8b2c-000c29609978','powerPathCmds',12,NULL,'POWERPATH_REPORT_PIM_STATS',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177e6da-7ede-11e4-8b2c-000c29609978','powerPathCmds',13,NULL,'POWERPATH_SERVER_DEVICE_FIND',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('8177e741-7ede-11e4-8b2c-000c29609978','powerPathCmds',14,NULL,'POWERPATH_INFO',NULL,NULL,'1','2014-12-08 00:00:00','Seed Data'),('97747f21-7956-11e4-8b2c-000c29609978','powerPathHardwareOptions',1,307831,'POWERPATH_LOCK_CONNECTOR_EN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('97748140-7956-11e4-8b2c-000c29609978','powerPathHardwareOptions',2,307832,'POWERPATH_IR_EN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('977481b4-7956-11e4-8b2c-000c29609978','powerPathHardwareOptions',3,307834,'POWERPATH_LF_EN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('9774821d-7956-11e4-8b2c-000c29609978','powerPathHardwareOptions',4,30783130,'POWERPATH_TAMPER_DET_EN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('9774828d-7956-11e4-8b2c-000c29609978','powerPathHardwareOptions',5,30783230,'POWERPATH_BLE_EN',NULL,NULL,'1','2014-12-01 00:00:00','Seed Data'),('d1d8eaac-8743-11e4-95a9-000c29609978','powerPathCCXMaintReason',16,0,'POWERPATH_MAINT_FIRMWARE_UPGRADE',NULL,NULL,'1','2014-12-19 00:00:00','Seed Data'),('d885b472-7d27-11e4-8b2c-000c29609978','powerPathUsageInfo',7,30786666,'POWERPATH_UNASSIGNED',NULL,NULL,'1','2014-12-06 00:00:00','Seed Data');
/*!40000 ALTER TABLE `tag_lookup_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role_det`
--

DROP TABLE IF EXISTS `user_role_det`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_role_det` (
  `user_role_recid` varchar(36) CHARACTER SET latin1 NOT NULL COMMENT 'uuid - unique identifier',
  `user_recid` varchar(36) CHARACTER SET latin1 NOT NULL,
  `organization_recid` varchar(36) CHARACTER SET latin1 NOT NULL,
  `deployment_recid` varchar(36) CHARACTER SET latin1 NOT NULL,
  `role_recid` varchar(36) CHARACTER SET latin1 NOT NULL,
  `notes` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL COMMENT '1 for Active 0 for Inactive',
  `created_on` datetime DEFAULT NULL,
  `modified_on` datetime DEFAULT NULL,
  `created_by` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`user_role_recid`),
  UNIQUE KEY `uk_user_org_deploy_id` (`user_recid`,`organization_recid`,`deployment_recid`),
  KEY `fk_deployment_recid` (`deployment_recid`),
  KEY `fk_role_recid` (`role_recid`),
  CONSTRAINT `fk_deployment_recid` FOREIGN KEY (`deployment_recid`) REFERENCES `deployment_m` (`deployment_recid`),
  CONSTRAINT `fk_role_recid` FOREIGN KEY (`role_recid`) REFERENCES `role_m` (`role_recid`),
  CONSTRAINT `fk_user_recid` FOREIGN KEY (`user_recid`) REFERENCES `user_m` (`user_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role_det`
--

LOCK TABLES `user_role_det` WRITE;
/*!40000 ALTER TABLE `user_role_det` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_role_det` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `firmware_versions`
--

DROP TABLE IF EXISTS `firmware_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `firmware_versions` (
  `firmware_version_recid` varchar(36) NOT NULL COMMENT 'uuid - unique identifier',
  `hw_peripherals` int(8) unsigned DEFAULT NULL,
  `host_fw_version` int(16) unsigned DEFAULT NULL,
  `host_fw_image_path` varchar(200) DEFAULT NULL,
  `wifi_fw_version` int(16) unsigned DEFAULT NULL,
  `wifi_fw_image_path` varchar(200) DEFAULT NULL,
  `ble_fw_version` int(16) unsigned DEFAULT NULL,
  `ble_fw_image_path` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1' COMMENT '1 for active 0 for inactive',
  `created_on` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'created on',
  `created_by` varchar(50) DEFAULT NULL COMMENT 'created by',
  PRIMARY KEY (`firmware_version_recid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='this table maintains the latest firmware versions and their image paths as uploaded into the server. \nat some time, we will have to identify what firmwares are acceptable for what hw_peripherals or host version no.\nthat is why, the field hw_peripherals is left in this table for future use.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `firmware_versions`
--

LOCK TABLES `firmware_versions` WRITE;
/*!40000 ALTER TABLE `firmware_versions` DISABLE KEYS */;
INSERT INTO `firmware_versions` VALUES ('dssadsad',1001,1001,NULL,NULL,NULL,NULL,NULL,1,'2014-12-11 12:54:58',NULL),('dssadsad1',1001,10011001,NULL,NULL,NULL,NULL,NULL,1,'2014-12-11 12:55:54',NULL);
/*!40000 ALTER TABLE `firmware_versions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-12-22 22:06:12
