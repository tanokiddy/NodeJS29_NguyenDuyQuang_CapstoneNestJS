-- Adminer 4.8.1 MySQL 8.0.32 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_code` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `room_id` int DEFAULT NULL,
  `date_comment` datetime DEFAULT NULL,
  `text_comment` varchar(1000) DEFAULT NULL,
  `rate_comment` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comments` (`id`, `job_code`, `user_id`, `room_id`, `date_comment`, `text_comment`, `rate_comment`) VALUES
(2,	1,	1,	7,	'2023-06-12 04:15:24',	'asdasdasdasd',	1),
(3,	1,	1,	7,	'2023-06-12 04:15:42',	'asdasdasdasd',	1);

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `nation` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `locations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `locations` (`id`, `location_name`, `city`, `nation`, `image`, `user_id`) VALUES
(1,	'Ha Long',	'Quang Ninh',	'Vietnam',	'1686465431084_quang-ninh.jpg',	10),
(2,	'Maldives',	'Maldives',	'Maldives',	'1686479441799_maldives.jpg',	1),
(3,	'Phu Quoc',	'Kien Giang',	'Vietnam',	'1686468078465_phu-quoc.jpg',	10),
(4,	'Sai Gon',	'Sai Gon',	'Vietnam',	'1686468707625_sai-gon.jpg',	10),
(5,	'Son Doong Cave',	'Quang Binh',	'Vietnam',	'1686468743404_son-doong.jpg',	1),
(6,	'Hoi An',	'Quang Binh',	'Vietnam',	'1686468763795_hoi-an.jpg',	2),
(7,	'Da Lat',	'Lam Dong',	'Vietnam',	'1686468803282_da-lat.jpg',	4),
(8,	'Mua cave',	'Ninh Binh',	'Vietnam',	'1686475697518_hang-mua.jpg',	8),
(9,	'Keangnam Landmark 72',	'Hanoi',	'Vietnam',	'1686468910550_ha-noi.jpg',	8),
(17,	'Maldives',	'Maldives',	'Maldives',	'1686527854761_maldives.jpg',	1);

DROP TABLE IF EXISTS `reservation`;
CREATE TABLE `reservation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int DEFAULT NULL,
  `date_in` datetime DEFAULT NULL,
  `date_out` datetime DEFAULT NULL,
  `guest_number` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `room_id` (`room_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reservation_ibfk_5` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `reservation_ibfk_6` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `reservation` (`id`, `room_id`, `date_in`, `date_out`, `guest_number`, `user_id`) VALUES
(2,	8,	'2023-06-11 02:37:28',	'2023-06-11 02:37:28',	10,	1);

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_id` int DEFAULT NULL,
  `room_name` varchar(255) DEFAULT NULL,
  `guest_number` int DEFAULT NULL,
  `bed_room` int DEFAULT NULL,
  `bed` int DEFAULT NULL,
  `bath_room` int DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `washer` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `television` tinyint(1) DEFAULT NULL,
  `air_conditioner` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `car_park` tinyint(1) DEFAULT NULL,
  `spool` tinyint(1) DEFAULT NULL,
  `flat_iron` tinyint(1) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rooms` (`id`, `location_id`, `room_name`, `guest_number`, `bed_room`, `bed`, `bath_room`, `description`, `price`, `washer`, `iron`, `television`, `air_conditioner`, `wifi`, `kitchen`, `car_park`, `spool`, `flat_iron`, `image`, `user_id`) VALUES
(7,	1,	'Da Lat',	1,	2,	0,	0,	'Da Lat',	1000,	1,	1,	1,	1,	1,	1,	1,	1,	1,	'1686527938526_da-lat.jpg',	1),
(8,	2,	'Ha Long',	1,	2,	0,	0,	'Ha Long',	900,	1,	1,	1,	1,	1,	1,	0,	0,	1,	'1686539240944_quang-ninh.jpg',	1);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `pass_word` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `birth_day` varchar(20) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` (`id`, `name`, `email`, `pass_word`, `phone`, `birth_day`, `gender`, `role`) VALUES
(1,	'user1',	'user1',	'$2b$10$CvFwcQvpjQgGVQy7SMN8rOOgxgmWMrPoXoh4XbfnTVREwNmv1Nl3m',	'user1',	'22/12/01',	'Male',	'guest'),
(2,	NULL,	'user2',	'$2b$10$I9h5RN0ueMe1odw1MCYuJO9ZoiOR3dBw9wbsXqT2KuQHuGi0XcUdC',	NULL,	NULL,	NULL,	NULL),
(3,	'user3',	'user3',	'$2b$10$MhLQdUivzS0p.khhPYHNsORXHJgR2kfx0OJaUKJfpb84pQsEXIWkm',	'123123',	'10/10/2010',	'Male',	'user'),
(4,	'user4',	'user4',	'$2b$10$kqXIAJtgd7XxRmi95kKn.Or8KajYgjBzu6z.McMagItVG7TtJz32e',	'123123',	'10/10/2010',	'Male',	'user'),
(5,	'user5',	'user5',	'$2b$10$r9pg7XlaokRJUN//tEhFhOM7WZFdcUmPxYG4Dyze9nvLGiNfU2meK',	'123123',	'10/10/2010',	'Male',	'user'),
(6,	'user6',	'user6',	'$2b$10$ZKE8UU8rvoQJIO921I5aZenLNh1MB2BPH1Eho/p7viJATMMhGYB6a',	'123123',	'10/10/2010',	'Male',	'user'),
(7,	'user7',	'user7',	'$2b$10$dPpvxifYUsYDP73deKls5.kePhQfXE0f6ZLLSghJN1fSrLc6EkOQa',	'123123',	'10/10/2010',	'Male',	'user'),
(8,	'user8',	'user8',	'$2b$10$oMtd.QVSp.Qaj9Ls3178PeqNzk4P/3yr8hKiOCUiQh8ECJz2nNNQ.',	'123123',	'10/10/2010',	'Male',	'user'),
(9,	'user10',	'user10',	'$2b$10$x67OTkRnkzMlL1A65otMfO8Bv5MaxvaXR.FhAveg27BGubthB9RjO',	'user10',	'10/10/2010',	'Male',	'user'),
(10,	'user9',	'user9',	'1234',	'123123',	'10/10/2020',	'Male',	'user');

-- 2023-06-12 05:34:33
