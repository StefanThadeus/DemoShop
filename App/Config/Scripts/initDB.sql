-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DemoShop
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DemoShop` DEFAULT CHARACTER SET utf8mb4 ;
USE `DemoShop` ;

-- -----------------------------------------------------
-- Table `DemoShop`.`Admin`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DemoShop`.`Admin` ;

CREATE TABLE IF NOT EXISTS `DemoShop`.`Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `token` VARCHAR(100),
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb4;


LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `DemoShop`.`Admin` (username, password, token) VALUES ('admin', 'f71e89a210512bd013ece176a2673ca6c3af1489751d87b0c733418460aba3a5', 'tkn1337');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;


-- -----------------------------------------------------
-- Table `DemoShop`.`Category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `DemoShop`.`Category` ;

CREATE TABLE IF NOT EXISTS `DemoShop`.`Category` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `parentId` INT NULL,
   `code` VARCHAR(45) NOT NULL,
   `title` VARCHAR(45) NOT NULL,
   `description` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 0
DEFAULT CHARACTER SET = utf8mb4;


LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `DemoShop`.`Category` (code, title, description) VALUES ('1', 'Beverages', 'Potable liquids.');
INSERT INTO `DemoShop`.`Category` (code, title, description) VALUES ('2', 'Foods', 'Edible substance with nutritional value.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (1, '11', 'Water', 'Inorganic, transparent, tasteless, odorless chemical substance, basic building block of life.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (1, '12', 'Coffee', 'Drink made from coffee beans. Contains caffeine, which is a stimulant.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (1, '13', 'Tea', 'Healthy drink made from various herbs.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (5, '131', 'Black Tea', 'A type of tea, distinguished by its distinct dark color.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (5, '132', 'White Tea', 'A type of bright colored tea.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (5, '133', 'Green Tea', 'Tea which is colored green.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (8, '1331', 'Sencha', 'A green tea from Japan.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (8, '1332', 'Gyokuro', 'A Japanese green tea.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (8, '1333', 'Matcha', 'A type of Chinese green tea.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (8, '1334', 'Pi Lo Chun', 'Green tea, originally from China.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (2, '21', 'Bread', 'Food prepared from a dough of flour.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (2, '22', 'Meat', 'Edible substance, mostly made of animal muscle tissue.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (2, '23', 'Ice Cream', 'A sweetened frozen food typically eaten as a snack or dessert.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (15, '231', 'Vanilla Ice Cream', 'Vanilla flavored ice cream, usually colored yellow.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (15, '232', 'Strawberry Ice Cream', 'Ice cream made from strawberry, usually colored red.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (15, '233', 'Chocolate Ice Cream', 'A chocolate flavored ice cream, usually colored dark brown.');

INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (18, '2331', 'Dark Chocolate', 'A type of chocolate which is usually more bitter than standard chocolate.');
INSERT INTO `DemoShop`.`Category` (parentId, code, title, description) VALUES (18, '2332', 'White Chocolate', 'White colored chocolate, known to be sweeter than standard chocolate.');

/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

