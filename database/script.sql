

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `approver`
--

DROP TABLE IF EXISTS `approver`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `approver` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_requestID` varchar(255) DEFAULT NULL,
  `approve_user` int DEFAULT NULL,
  `status` int DEFAULT '0',
  `reason` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='			';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `approver`
--

LOCK TABLES `approver` WRITE;
/*!40000 ALTER TABLE `approver` DISABLE KEYS */;
INSERT INTO `approver` VALUES (32,'77',4,2,'test',NULL),(33,'78',10,0,NULL,NULL),(34,'79',1,0,NULL,NULL),(35,'80',2,1,'',NULL);
/*!40000 ALTER TABLE `approver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_plan`
--

DROP TABLE IF EXISTS `detail_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_plan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `task` varchar(255) DEFAULT NULL,
  `employee` int DEFAULT NULL,
  `device` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  `quantity` varchar(255) DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '0',
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_plan`
--

LOCK TABLES `detail_plan` WRITE;
/*!40000 ALTER TABLE `detail_plan` DISABLE KEYS */;
INSERT INTO `detail_plan` VALUES (80,50,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',1,'2024-01-06','2024-01-10'),(81,50,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',1,'2024-01-06','2024-01-10'),(82,50,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',1,'2024-01-06','2024-01-10');
/*!40000 ALTER TABLE `detail_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detail_request`
--

DROP TABLE IF EXISTS `detail_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detail_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `resquest_id` int DEFAULT NULL,
  `material_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detail_request`
--

LOCK TABLES `detail_request` WRITE;
/*!40000 ALTER TABLE `detail_request` DISABLE KEYS */;
INSERT INTO `detail_request` VALUES (25,80,14,100,'lít'),(26,80,15,50,'kg '),(27,80,16,200,'lít '),(28,80,17,30,'thùng');
/*!40000 ALTER TABLE `detail_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `devices`
--

DROP TABLE IF EXISTS `devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `devices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `device_name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `is_deleted` int DEFAULT NULL,
  `last_maintenance` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'Máy phun sơn tĩnh điện',1,0,'2024-04-01 08:00:00'),(2,'Lò sấy',1,0,'2024-03-15 10:30:00'),(3,'Máy trộn sơn',1,0,'2024-02-20 09:45:00'),(4,'Máy đo độ dày sơn',1,0,'2024-01-10 14:20:00'),(5,'Máy xịt',1,0,'2024-03-20 11:15:00'),(6,'Máy nén khí',1,0,'2024-01-05 07:30:00'),(7,'Đèn kiểm tra',1,0,'2024-02-10 13:00:00'),(8,'Máy mài',1,0,'2024-04-05 09:00:00'),(9,'Máy cắt',1,0,'2024-03-01 08:45:00'),(10,'Máy rửa sơn',1,0,'2024-02-15 12:30:00'),(11,'Máy phun sơn',1,0,'2024-04-10 10:00:00'),(12,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `unit` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Chất tạo bóng',1000,'lít'),(2,'Chất chống oxy hóa',1000,'kg'),(3,'Chất tạo độ bám dính',1000,'kg'),(4,'Chất chống tĩnh điện',1000,'kg'),(5,'Xylene',1000,'lít'),(6,'Toluene',1000,'lít'),(7,'Ethyl acetate',1000,'lít'),(8,'Methyl ethyl ketone (MEK)',1000,'lít'),(9,'Isopropyl alcohol (IPA)',1000,'lít'),(10,'Nhựa acrylic',1000,'kg'),(11,'Polyurethane',1000,'kg'),(12,'Chất xúc tác - Amine',1000,'kg'),(13,'Chất xúc tác - Anhydrid',1000,'kg'),(14,'Dầu mài',1100,NULL),(15,'Cát nhám',1050,NULL),(16,'Dung môi',1200,NULL),(17,'Sơn tĩnh điện',1030,NULL);
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `user_manage` int NOT NULL,
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  `status` int DEFAULT '0',
  `acceptance` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='				';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (50,'Kế hoạch sản xuất sơn tĩnh điện',4,'2024-01-06','2024-01-10',1,0);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_request`
--

DROP TABLE IF EXISTS `purchase_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `user_approve` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '0',
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_request`
--

LOCK TABLES `purchase_request` WRITE;
/*!40000 ALTER TABLE `purchase_request` DISABLE KEYS */;
INSERT INTO `purchase_request` VALUES (80,50,11,1,'2024-05-14 03:45:47',1,'');
/*!40000 ALTER TABLE `purchase_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int DEFAULT '1',
  `is_deleted` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin',1,0,'2024-04-07 08:04:54','2024-05-13 14:16:39'),(2,'Quản đốc',1,0,'2024-04-07 08:04:54','2024-04-07 08:04:54'),(3,'Nhân viên',1,0,'2024-04-07 08:04:54','2024-04-07 08:04:54');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `password` varchar(500) NOT NULL,
  `address` varchar(500) DEFAULT NULL,
  `status` int DEFAULT '1',
  `is_deleted` int DEFAULT '0',
  `role_id` int DEFAULT '3',
  `workspace_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Boss','Chủ xưởng','$2b$06$iKo9rTGvFb6l2C4dgL3IC.Xdo4jS2MVZG1uLotkcFPmbds3jn22lG','Quỳnh Phụ, Quỳnh Phụ, Thái Bình',1,0,1,3,'2024-05-13 02:29:32','2024-05-13 16:12:12'),(2,'admin','Quản trị viên','$2b$06$ZEFIgDP3J/Rr0s7r2Un.J.bORKjIpkHQoyaX946FtLsS.VyTa1eu6','Nam Phong,  Nam Trực, Nam Định',1,0,1,3,'2024-04-28 08:22:35','2024-05-13 16:11:34'),(3,'duyd','Đoàn Đức Duy','$2b$06$bCGSf4QMR5kRizwVrMxWPO1JIKZo/kebK3K/meIdt6oDNNe5hnCny','Xuân Trường, Xuân Trường, Nam Định',1,0,2,7,'2024-04-28 09:22:25','2024-05-13 16:08:02'),(4,'hieutt','Trần Trung Hiếu','$2b$06$tmv91NayeFUsU5LTm.gjKeLnUSOtZCNJZg7nASHBhq3rOx2QGmey6','Lộc Vượng, Thành phố Nam Định',1,0,2,3,'2024-04-29 07:58:31','2024-05-14 15:06:26'),(5,'nampq','Phạm Quang Nam','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Vị Hoàng, Thành phố Nam Định',1,0,3,3,'2024-04-29 09:26:59','2024-05-13 16:08:02'),(6,'tunglt','Lê Thanh Tùng','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Nghĩa Hưng, Nghĩa Hưng, Nam Định',1,0,3,3,'2024-05-11 08:28:51','2024-05-13 16:08:02'),(7,'hongnt','Nguyễn Thị Hồng','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phú Thịnh, Đông Hưng, Thái Bình',1,0,3,3,'2024-05-11 08:28:51','2024-05-13 16:08:02'),(8,'ducvm','Vũ Minh Đức','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phượng Liễu, Kiến Xương, Thái Bình',1,0,3,7,'2024-05-11 08:28:51','2024-05-13 16:08:02'),(9,'lanlt','Lê Thị Lan','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phúc Thành, Quỳnh Phụ, Thái Bình',1,0,3,3,'2024-05-11 08:28:51','2024-05-13 16:08:02'),(11,'quynhpt','Phạm Thị Quỳnh','$2b$06$clAWvtIhhoCRXwZM9BE6Pe72S6yAW9wAmA.vbzbzSjGkY6n8mWIYS','Thịnh Long, Hải Hậu, Nam Định',1,0,2,7,'2024-04-07 07:51:44','2024-05-13 16:11:58'),(12,'hiephv','Hoàng Văn Hiệp','$2b$06$dh23OgjXXMchXk6jFThbjeWwhabpUY4DXMpavbLwaq2yP1jHzMajS','Thịnh Long, Hải Hậu, Nam Định',1,0,3,3,'2024-05-13 17:20:08','2024-05-13 17:20:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workspaces`
--

DROP TABLE IF EXISTS `workspaces`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workspaces` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` int DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` int DEFAULT '1',
  `is_deleted` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workspaces`
--

LOCK TABLES `workspaces` WRITE;
/*!40000 ALTER TABLE `workspaces` DISABLE KEYS */;
INSERT INTO `workspaces` VALUES (3,70317921,'Phân xưởng sơn số 1','Nam Định',1,1,0,'2024-04-28 08:34:19','2024-05-13 15:30:54'),(7,86835379,'Phân xưởng sơn số 2','Hà Nam',3,1,0,'2024-05-13 03:00:14','2024-05-13 15:30:54');
/*!40000 ALTER TABLE `workspaces` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-15  0:21:26
