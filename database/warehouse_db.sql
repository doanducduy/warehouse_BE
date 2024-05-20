-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: warehouse
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Dumping data for table `approver`
--

LOCK TABLES `approver` WRITE;
/*!40000 ALTER TABLE `approver` DISABLE KEYS */;
INSERT INTO `approver` VALUES (1,'1',1,1,''),(2,'2',1,0,NULL),(3,'3',1,0,NULL),(4,'4',1,0,NULL);
/*!40000 ALTER TABLE `approver` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `detail_plan`
--

LOCK TABLES `detail_plan` WRITE;
/*!40000 ALTER TABLE `detail_plan` DISABLE KEYS */;
INSERT INTO `detail_plan` VALUES (1,1,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',1,'2024-01-06','2024-01-10'),(2,1,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',0,'2024-01-06','2024-01-10'),(3,1,'Kiểm tra chất lượng',8,'7,4','17','30','thùng, lít',0,'2024-01-06','2024-01-10'),(4,1,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',0,'2024-01-06','2024-01-10'),(5,0,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',0,'2024-01-06','2024-01-10'),(6,0,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',0,'2024-01-06','2024-01-10'),(7,0,'Kiểm tra chất lượng',8,'7,4','17','30','thùng, lít',0,'2024-01-06','2024-01-10'),(8,0,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',0,'2024-01-06','2024-01-10'),(9,3,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',0,'2024-01-06','2024-01-10'),(10,3,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',0,'2024-01-06','2024-01-10'),(11,3,'Kiểm tra chất lượng',8,'7,4','17','30','thùng, lít',0,'2024-01-06','2024-01-10'),(12,3,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',0,'2024-01-06','2024-01-10'),(13,4,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',0,'2024-01-06','2024-01-10'),(14,4,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',0,'2024-01-06','2024-01-10'),(15,4,'Kiểm tra chất lượng',8,'7,4','17','30','thùng, lít',0,'2024-01-06','2024-01-10'),(16,4,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',0,'2024-01-06','2024-01-10'),(17,5,'Chuẩn bị bề mặt',6,'11,9,8','14,15,16','100,50,150','lít, kg, lít',0,'2024-01-06','2024-01-10'),(18,5,'Phủ lớp sơn đầu tiên',7,'11','17,16','30,30','thùng, lít',0,'2024-01-06','2024-01-10'),(19,5,'Kiểm tra chất lượng',8,'7,4','17','30','thùng, lít',0,'2024-01-06','2024-01-10'),(20,5,'Phủ lớp sơn cuối cùng',9,'11','17,16','30,50','thùng, lít',0,'2024-01-06','2024-01-10');
/*!40000 ALTER TABLE `detail_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `detail_request`
--

LOCK TABLES `detail_request` WRITE;
/*!40000 ALTER TABLE `detail_request` DISABLE KEYS */;
INSERT INTO `detail_request` VALUES (1,1,14,100,'lít'),(2,1,15,50,'kg '),(3,1,16,200,'lít '),(4,1,17,30,'thùng'),(5,2,14,100,'lít'),(6,2,15,50,'kg '),(7,2,16,200,'lít '),(8,2,17,30,'thùng'),(9,3,14,100,'lít'),(10,3,15,50,'kg '),(11,3,16,200,'lít '),(12,3,17,30,'thùng'),(13,4,14,100,'lít'),(14,4,15,50,'kg '),(15,4,16,200,'lít '),(16,4,17,30,'thùng');
/*!40000 ALTER TABLE `detail_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `devices`
--

LOCK TABLES `devices` WRITE;
/*!40000 ALTER TABLE `devices` DISABLE KEYS */;
INSERT INTO `devices` VALUES (1,'Máy phun sơn tĩnh điện',1,0,'2024-04-01 08:00:00'),(2,'Lò sấy',1,0,'2024-03-15 10:30:00'),(3,'Máy trộn sơn',1,0,'2024-02-20 09:45:00'),(4,'Máy đo độ dày sơn',1,0,'2024-01-10 14:20:00'),(5,'Máy xịt',1,0,'2024-03-20 11:15:00'),(6,'Máy nén khí',1,0,'2024-01-05 07:30:00'),(7,'Đèn kiểm tra',1,0,'2024-02-10 13:00:00'),(8,'Máy mài',1,0,'2024-04-05 09:00:00'),(9,'Máy cắt',1,0,'2024-03-01 08:45:00'),(10,'Máy rửa sơn',1,0,'2024-02-15 12:30:00'),(11,'Máy phun sơn',1,0,'2024-04-10 10:00:00'),(12,'',NULL,NULL,NULL);
/*!40000 ALTER TABLE `devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (1,'Chất tạo bóng',1000,'lít'),(2,'Chất chống oxy hóa',1000,'kg'),(3,'Chất tạo độ bám dính',1000,'kg'),(4,'Chất chống tĩnh điện',1000,'kg'),(5,'Xylene',1000,'lít'),(6,'Toluene',1000,'lít'),(7,'Ethyl acetate',1000,'lít'),(8,'Methyl ethyl ketone (MEK)',1000,'lít'),(9,'Isopropyl alcohol (IPA)',1000,'lít'),(10,'Nhựa acrylic',1000,'kg'),(11,'Polyurethane',1000,'kg'),(12,'Chất xúc tác - Amine',1000,'kg'),(13,'Chất xúc tác - Anhydrid',1000,'kg'),(14,'Dầu mài',300,'kg'),(15,'Cát nhám',650,'kg'),(16,'Dung môi',150,'thùng'),(17,'Sơn tĩnh điện',130,'thùng');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (2,'Kế hoạch sản xuất sơn tĩnh điện',4,'2024-01-06','2024-01-10',0,1,'test'),(4,'Kế hoạch sản xuất sơn tĩnh điện',3,'2024-01-06','2024-01-10',0,0,NULL),(5,'Kế hoạch sản xuất sơn tĩnh điện',3,'2024-01-06','2024-01-10',0,0,NULL);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `purchase_request`
--

LOCK TABLES `purchase_request` WRITE;
/*!40000 ALTER TABLE `purchase_request` DISABLE KEYS */;
INSERT INTO `purchase_request` VALUES (1,1,11,1,'2024-05-17 06:29:45',1,''),(2,2,11,1,'2024-05-20 14:38:02',0,NULL),(3,2,3,1,'2024-05-20 14:38:33',0,NULL),(4,2,3,1,'2024-05-20 14:39:57',0,NULL);
/*!40000 ALTER TABLE `purchase_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Chủ xưởng',1,0,'2024-04-07 08:04:54','2024-05-16 20:59:49'),(2,'Quản trị hệ thống',1,0,'2024-04-07 08:04:54','2024-05-16 21:00:38'),(3,'Quản đốc',1,0,'2024-04-07 08:04:54','2024-05-16 20:59:49'),(4,'Nhân viên',1,0,'2024-05-16 20:59:49','2024-05-16 20:59:49');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Boss','Chủ xưởng','$2b$06$iKo9rTGvFb6l2C4dgL3IC.Xdo4jS2MVZG1uLotkcFPmbds3jn22lG','Quỳnh Phụ, Quỳnh Phụ, Thái Bình',1,0,1,NULL,'2024-05-13 02:29:32','2024-05-17 01:01:35'),(2,'admin','Quản trị viên','$2b$06$ZEFIgDP3J/Rr0s7r2Un.J.bORKjIpkHQoyaX946FtLsS.VyTa1eu6','Nam Phong,  Nam Trực, Nam Định',1,0,2,NULL,'2024-04-28 08:22:35','2024-05-17 01:01:35'),(3,'duyd','Đoàn Đức Duy','$2b$06$bCGSf4QMR5kRizwVrMxWPO1JIKZo/kebK3K/meIdt6oDNNe5hnCny','Xuân Trường, Xuân Trường, Nam Định',1,0,3,1,'2024-04-28 09:22:25','2024-05-17 06:21:09'),(4,'hieutt','Trần Trung Hiếu','$2b$06$tmv91NayeFUsU5LTm.gjKeLnUSOtZCNJZg7nASHBhq3rOx2QGmey6','Lộc Vượng, Thành phố Nam Định',1,0,3,2,'2024-04-29 07:58:31','2024-05-17 06:22:28'),(5,'nampq','Phạm Quang Nam','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Vị Hoàng, Thành phố Nam Định',1,0,4,2,'2024-04-29 09:26:59','2024-05-17 06:25:29'),(6,'tunglt','Lê Thanh Tùng','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Nghĩa Hưng, Nghĩa Hưng, Nam Định',1,0,4,1,'2024-05-11 08:28:51','2024-05-17 06:25:29'),(7,'hongnt','Nguyễn Thị Hồng','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phú Thịnh, Đông Hưng, Thái Bình',1,0,4,2,'2024-05-11 08:28:51','2024-05-17 06:25:29'),(8,'ducvm','Vũ Minh Đức','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phượng Liễu, Kiến Xương, Thái Bình',1,0,4,1,'2024-05-11 08:28:51','2024-05-17 06:25:29'),(9,'lanlt','Lê Thị Lan','$2b$06$G4OHQW0PXhl0oTG4QFyK5uyOysJsheCnzl7CoGUi25ca7LyoUUlPm','Phúc Thành, Quỳnh Phụ, Thái Bình',1,0,4,1,'2024-05-11 08:28:51','2024-05-17 06:25:29'),(11,'quynhpt','Phạm Thị Quỳnh','$2b$06$clAWvtIhhoCRXwZM9BE6Pe72S6yAW9wAmA.vbzbzSjGkY6n8mWIYS','Thịnh Long, Hải Hậu, Nam Định',1,0,4,2,'2024-04-07 07:51:44','2024-05-17 06:25:29'),(12,'hiephv','Hoàng Văn Hiệp','$2b$06$dh23OgjXXMchXk6jFThbjeWwhabpUY4DXMpavbLwaq2yP1jHzMajS','Thịnh Long, Hải Hậu, Nam Định',1,0,4,1,'2024-05-13 17:20:08','2024-05-17 06:25:29'),(13,'ninhtq','Trương Quân Ninh','$2b$06$3t5f6ovRTKn8DaZpoj430en2YgiDk.VEdTsYKFMknqaaGZMmXyGxG','Ninh Bình',1,0,4,2,'2024-05-14 18:23:45','2024-05-17 06:25:29'),(14,'anhnv','Nguyễn Văn Anh','$2b$06$JF.d953f4PkH1wHTMEjQJ.zGNV1hyziQeIe9aFmWZXhQzQFLcdodu','Lạc Long Quân, Tây Hồ, Hà Nội',1,0,4,1,'2024-05-15 15:48:26','2024-05-17 06:25:29'),(15,'bacht','Trần Thị Bạch','$2b$06$yOk.ac0X3UBEOeCQHcwa4OUofWP6v.AlEf/hm7Qx1yLlytNUheM5u','Bạch Mai, Hai Bà Trưng, Hà Nội',1,0,3,0,'2024-05-15 15:50:19','2024-05-17 11:20:26'),(16,'chinhd','Đinh Đình Chính','$2b$06$B1G.Q.aII4uoWWT1VUOV9ewTQXrTqWUxyBsJHDuyG4sMFhQpLeCuK','Bạch Mai, Hai Bà Trưng, Hà Nội',1,0,4,1,'2024-05-15 15:53:41','2024-05-17 06:25:29'),(17,'hungnq','Nguyễn Quang Hùng','$2b$06$fT2SVIsyWDUMwz0ED4R3DO6doyevWzDzuCkHwSfBeawBSgWuZPKwK','Trực Ninh, Nam Định',1,0,4,1,'2024-05-15 15:54:07','2024-05-17 06:25:29'),(18,'tuantl','Trần Lê Tuấn','$2b$06$UroI6BK45sG2U9YGvxZPcewlvuue4DgzwFjr3zvp2UvCJuvwm3sCi','Ý Yên, Nam Định',1,0,4,2,'2024-05-15 15:55:23','2024-05-17 06:25:29'),(19,'phuongtm','Trịnh Minh Phương','$2b$06$5tNNcPrUltgN2SWNWeHD/.6UZ8aUYWsUtNjh0Am7EPWmLFS9f0aom','Nho Quan, Ninh Bình',1,0,4,1,'2024-05-15 15:56:17','2024-05-17 06:25:29'),(20,'khoangh','Nguyễn Hữu Khoáng','$2b$06$SWWS/h4IiZ.zfS4cKlPjW.CYxv/p9Vm/I1.ucuUutgDW8sqYoYxM.','Hoa Lư, Ninh Bình',1,0,4,1,'2024-05-15 15:56:41','2024-05-17 06:25:29'),(21,'luatpv','Phạm Văn Luật','$2b$06$ir3Hbi5isprPjeSg.4TXkODJejPddC4LH7H0YGVqlAaF1tO/H1pGG','Kiến Xương, Thái Bình',1,0,4,1,'2024-05-15 15:57:13','2024-05-17 06:25:29'),(22,'sonlt','Lê Thị Sơn','$2b$06$wpBm3SHlY5HGWt/97h1k4Ofqmt93O.vZaeiQlBjoORVsCvJzt7.fq','Thái Thụy, Thái Bình',1,0,4,2,'2024-05-15 15:57:37','2024-05-17 06:25:29'),(23,'trungdq','Đặng Quang Trung','$2b$06$iXzN7vZwGIFTG6P/Px/d/ugr/LVHyGx7jq2.q8ATQWi8xJrRR9N.2','Thái Thụy, Thái Bình',1,0,4,2,'2024-05-15 15:58:16','2024-05-17 06:25:29'),(24,'hoanght','Hoàng Thị Hoàng','$2b$06$UCNfo3sAxg.CEXnc9EL9neB2IfeIRjPvpxL36WRXeRshOChxAg.vy','Duy Tiên, Hà Nam',1,0,4,2,'2024-05-15 16:01:52','2024-05-17 06:25:29'),(25,'khoilt','Lê Thị Khoái','$2b$06$EvyEsz9aaNp99av4YwmJJu/kZvnZqATToMRPqwOjpoWePa38/P7K6','Thọ Xuân, Thanh Hóa',1,0,4,2,'2024-05-15 16:02:30','2024-05-17 06:25:29'),(26,'quyenbt','Bùi Thị Quyên','$2b$06$W9Nk3wA4JMVf4HYUIklDO.dCsZwRSmvRnJFQxdKyGeLmkkMuzuaKC','Hoằng Hóa, Thanh Hóa',1,0,4,2,'2024-05-15 16:04:26','2024-05-17 06:25:29'),(27,'tungkq','Khuất Quang Tùng','$2b$06$KizTURimcfkxDjglQL6WVO5kgBU9iitqXBYei4jAbrSTayoSzcO12','Hạ Long, Quảng Ninh',1,0,4,2,'2024-05-15 16:04:54','2024-05-17 06:25:29'),(28,'minhhb','Hoàng Bảo Minh','$2b$06$AfN3xiRlkA7IzUDqC7ruNuX.UOs9lBY7hx9Hu0N.PnTc4rCmJkoJq','Cẩm Phả, Quảng Ninh',1,0,4,2,'2024-05-15 16:05:38','2024-05-17 06:25:29'),(29,'tranglh','Lê Hoài Trang','$2b$06$iHvRDWEkZyxOTyQj1QiCsOL04VJIGZZwHG3zovXZvqnLh0T.chUX6','Nam Trực, Nam Định',1,0,4,1,'2024-05-15 16:06:00','2024-05-17 06:25:29'),(30,'anhdn','Đỗ Ngọc Anh','$2b$06$vtNg6TYfCFI.c.xMmwRDNeFikfkMHGzM7LH/1q0T1Rwwb/YHKXOqW','Giao Thủy, Nam Định',1,0,4,1,'2024-05-15 16:06:36','2024-05-17 06:25:29'),(31,'hungtd','Trần Duy Hùng','$2b$06$iaf9CTR5xCe08WXMJ9pu2uQHvEVU321CVJ1S0bNTcXiowQdmh4uPW','Kim Sơn, Ninh Bình',1,0,4,2,'2024-05-15 16:07:10','2024-05-17 06:25:29'),(32,'nghiacv','Cao Văn Nghĩa','$2b$06$/3m6UIuknZM.zRiLgasWC.r4zgcyzFUDJ4Ezj6styix9QPOK0xMUK','Hải Hậu, Nam Định',1,1,4,1,'2024-05-16 19:26:32','2024-05-17 06:25:29'),(33,'nghiavm','Vũ Minh Nghĩa','$2b$06$Lgrb/PorasfJ5ihP4fzrjuDyORO5b0TpzqwPy9zyYzRNgBXgjQIE6','Thạch Thất, Hà Nội',1,0,3,2,'2024-05-17 06:24:28','2024-05-17 06:24:28');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `workspaces`
--

LOCK TABLES `workspaces` WRITE;
/*!40000 ALTER TABLE `workspaces` DISABLE KEYS */;
INSERT INTO `workspaces` VALUES (1,22302043,'Phân xưởng sơn số 1','Hà Nội',3,1,0,'2024-05-17 06:21:09','2024-05-17 06:21:09'),(2,34997580,'Phân xưởng sơn số 2','Hà Nam',4,1,0,'2024-05-17 06:22:28','2024-05-17 06:22:28'),(3,28959713,'Phân xưởng sơn số 3','Thành phố Hồ Chí Minh (Việt Nam)',15,1,1,'2024-05-17 11:20:26','2024-05-17 11:23:36');
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

-- Dump completed on 2024-05-20 22:04:43
