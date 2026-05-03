-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 24, 2025 at 02:31 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bridge_maintainance`
--

-- --------------------------------------------------------

--
-- Table structure for table `bridge`
--

CREATE TABLE `bridge` (
  `ID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Construction Date` date NOT NULL,
  `Lattitude` float NOT NULL,
  `Longitude` float NOT NULL,
  `Minimum Temperature` float NOT NULL,
  `Average Temperature` float NOT NULL,
  `Maximum Temperature` float NOT NULL,
  `Minimum Absolute Humidity` float NOT NULL,
  `Average Absolute Humidity` float NOT NULL,
  `Maximum Absolute Humidity` float NOT NULL,
  `Minimum Relative Humidity` float NOT NULL,
  `Average Relative Humidity` float NOT NULL,
  `Maximum Relative Humidity` float NOT NULL,
  `Wind Direction` varchar(10) NOT NULL,
  `Minimum Wind Speed` float NOT NULL,
  `Average Wind Speed` float NOT NULL,
  `Maximum Wind Speed` float NOT NULL,
  `Minimum NO2` float NOT NULL,
  `Average NO2` float NOT NULL,
  `Maximum NO2` float NOT NULL,
  `Minimum SO2` float NOT NULL,
  `Average SO2` float NOT NULL,
  `Maximum SO2` float NOT NULL,
  `Minimum CO` float NOT NULL,
  `Average CO` float NOT NULL,
  `Maximum CO` float NOT NULL,
  `Minimum CO2` float NOT NULL,
  `Average CO2` float NOT NULL,
  `Maximum CO2` float NOT NULL,
  `Minimum Rain` float NOT NULL,
  `Average Rain` float NOT NULL,
  `Maximum Rain` float NOT NULL,
  `Minimum Rain Water PH` float NOT NULL,
  `Average RainWater PH` float NOT NULL,
  `Maximum RainWater PH` float NOT NULL,
  `Minimum WaterFlow Speed` float NOT NULL,
  `Average WaterFlow Speed` float NOT NULL,
  `Maximum WaterFlow Speed` float NOT NULL,
  `Minimum Water Level` float NOT NULL,
  `Average Water Level` float NOT NULL,
  `Maximum Water Level` float NOT NULL,
  `Minimum Ph of RiverWater` float NOT NULL,
  `Average Ph of RiverWater` float NOT NULL,
  `Maximum Ph of RiverWater` float NOT NULL,
  `Total Floods` int(11) NOT NULL,
  `Flood Intensity` float NOT NULL,
  `Age` int(11) NOT NULL,
  `Concrete Type` varchar(50) NOT NULL,
  `Design Type` varchar(50) NOT NULL,
  `Rated_Load_Capacity` float NOT NULL,
  `Expiry_Date` int(11) NOT NULL,
  `Slab Thickness` float NOT NULL,
  `Bear_Surface_Area` float NOT NULL,
  `No_Of_Beams` int(11) NOT NULL,
  `Length` float NOT NULL,
  `Width` float NOT NULL,
  `Height` float NOT NULL,
  `Minimum Traffic Volume` int(11) NOT NULL,
  `Average Traffic Volume` int(11) NOT NULL,
  `Maximum Traffic Volume` int(11) NOT NULL,
  `Minimum Traffic Load` float NOT NULL,
  `Average Traffic Load` float NOT NULL,
  `Maximum Traffic Load` float NOT NULL,
  `Speed Limit` int(11) NOT NULL,
  `No of Maintenance` int(11) NOT NULL,
  `Average Time Gap in Maintenance` float NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bridge`
--

INSERT INTO `bridge` (`ID`, `Name`, `Construction Date`, `Lattitude`, `Longitude`, `Minimum Temperature`, `Average Temperature`, `Maximum Temperature`, `Minimum Absolute Humidity`, `Average Absolute Humidity`, `Maximum Absolute Humidity`, `Minimum Relative Humidity`, `Average Relative Humidity`, `Maximum Relative Humidity`, `Wind Direction`, `Minimum Wind Speed`, `Average Wind Speed`, `Maximum Wind Speed`, `Minimum NO2`, `Average NO2`, `Maximum NO2`, `Minimum SO2`, `Average SO2`, `Maximum SO2`, `Minimum CO`, `Average CO`, `Maximum CO`, `Minimum CO2`, `Average CO2`, `Maximum CO2`, `Minimum Rain`, `Average Rain`, `Maximum Rain`, `Minimum Rain Water PH`, `Average RainWater PH`, `Maximum RainWater PH`, `Minimum WaterFlow Speed`, `Average WaterFlow Speed`, `Maximum WaterFlow Speed`, `Minimum Water Level`, `Average Water Level`, `Maximum Water Level`, `Minimum Ph of RiverWater`, `Average Ph of RiverWater`, `Maximum Ph of RiverWater`, `Total Floods`, `Flood Intensity`, `Age`, `Concrete Type`, `Design Type`, `Rated_Load_Capacity`, `Expiry_Date`, `Slab Thickness`, `Bear_Surface_Area`, `No_Of_Beams`, `Length`, `Width`, `Height`, `Minimum Traffic Volume`, `Average Traffic Volume`, `Maximum Traffic Volume`, `Minimum Traffic Load`, `Average Traffic Load`, `Maximum Traffic Load`, `Speed Limit`, `No of Maintenance`, `Average Time Gap in Maintenance`, `Status`) VALUES
(1, 'Bridge A', '2000-05-05', 19.59, 73.47, 27.08, 39.7644, 41.09, 4.36005, 7.06611, 15.342, 9, 14.0002, 51, 'none', 5.54, 5.54, 5.54, 0.83, 1.57, 6.94, 1.85, 7.59177, 20.03, 120.98, 177.436, 467.3, 120.98, 177.436, 467.3, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 299, 'High-Strength', 'Cable-Stayed', 50000, -22, 500, 20000, 140, 1400, 36.5, 21, 2147483647, 79, 96, 1205160, 1205160, 1205160, 80, 1, 0, 'Working'),
(2, 'Bridge A', '2000-05-05', 19.59, 73.47, 27.08, 39.7644, 41.09, 4.36005, 7.06611, 15.342, 9, 14.0002, 51, 'none', 5.54, 5.54, 5.54, 0.83, 1.57, 6.94, 1.85, 7.59177, 20.03, 120.98, 177.436, 467.3, 120.98, 177.436, 467.3, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 299, 'High-Strength', 'Truss', 50000, -22, 500, 20000, 140, 1400, 36.5, 21, -1, -1, -1, -1, -1, -1, 80, 0, 0, 'Working'),
(3, 'AdiBridge', '1867-01-17', 21.1458, 79.0882, 31.24, 39.7155, 41.91, 3.74403, 4.52935, 9.09491, 7, 8.99903, 23, 'none', 2.57, 2.57, 2.57, 1.17, 1.30622, 42.16, 4.09, 4.20504, 76.29, 162.42, 164.219, 1522.06, 162.42, 164.219, 1522.06, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 1899, 'High-Strength', 'Cable-Stayed', 300, -22, 10, 200, 7, 700, 100, 100, -1, -1, -1, -1, -1, -1, 120, 0, 0, 'Working'),
(4, 'MAYUR BRIDGE', '2009-02-17', 19.59, 73.47, 32.57, 39.7587, 39.77, 5.89463, 7.06421, 14.0807, 12, 14.0005, 37, 'none', 7.82, 7.82, 7.82, 0.92, 1.48, 3.84, 4.37, 7.55355, 9.16, 120.98, 176.883, 177.99, 120.98, 176.883, 177.99, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 194, 'High-Strength', 'Cable-Stayed', 50000, -22, 500, 20000, 140, 1400, 36.5, 21, -1, -1, -1, -1, -1, -1, 80, 0, 0, 'Working'),
(5, 'Bridg b', '2006-09-14', 19.9998, 21.5965, 22.79, 28.0203, 28.73, 2.71569, 3.25395, 3.39905, 10, 11.9986, 15, 'none', 8.2, 8.2, 8.2, 0.06, 0.0650146, 0.12, 0.04, 0.0500049, 0.06, 103.05, 103.334, 114.57, 103.05, 103.334, 114.57, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0, 223, 'Self-Consolidating', 'Cable-Stayed', 14895, -22, 400, 500, 15, 1500, 160, 140, -1, -1, -1, -1, -1, -1, 120, 0, 0, 'Working'),
(6, 'Bridg b', '2006-09-14', 19.9998, 21.5965, 22.79, 28.3753, 28.73, 2.71569, 3.18157, 3.39905, 10, 11.4986, 15, 'none', 8.2, 8.2, 8.2, 0.06, 0.0675146, 0.12, 0.04, 0.0550049, 0.06, 103.05, 103.474, 114.57, 103.05, 103.474, 114.57, 0, 0, 0, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 0, -1, 0, 223, 'Self-Consolidating', 'Cable-Stayed', 14895, -22, 400, 500, 15, 1500, 160, 140, -1, -1, -1, -1, -1, -1, 120, 0, 0, 'Working');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `maintenance id` int(11) NOT NULL,
  `bridge id` int(11) NOT NULL,
  `bridge name` varchar(50) NOT NULL,
  `assign user name` varchar(50) NOT NULL,
  `remaining lifespan` float NOT NULL,
  `durability` float NOT NULL,
  `assigned date` date NOT NULL,
  `status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance`
--

INSERT INTO `maintenance` (`maintenance id`, `bridge id`, `bridge name`, `assign user name`, `remaining lifespan`, `durability`, `assigned date`, `status`) VALUES
(1, 1, 'Bridge A', 'shubham', 40.1, 72.8118, '2026-09-14', 'completed'),
(2, 1, 'Bridge A', 'krushana', 40.0997, 72.8118, '2006-09-14', 'completed'),
(3, 1, 'Bridge A', 'krushana', 40.0997, 72.8118, '2026-05-22', 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance_history`
--

CREATE TABLE `maintenance_history` (
  `ID` int(11) NOT NULL,
  `Bridge_ID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Maintenance_Type` varchar(50) NOT NULL,
  `Description` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maintenance_history`
--

INSERT INTO `maintenance_history` (`ID`, `Bridge_ID`, `Date`, `Maintenance_Type`, `Description`) VALUES
(1, 2, '2025-02-15', 'Repair', 'the completer repairing is done in this');

-- --------------------------------------------------------

--
-- Table structure for table `recommendation`
--

CREATE TABLE `recommendation` (
  `RecId` int(11) NOT NULL,
  `BridgeId` int(11) NOT NULL,
  `ScanDate` date NOT NULL,
  `Remaining Lifespan` float NOT NULL,
  `Durability` float NOT NULL,
  `Status` varchar(10) NOT NULL,
  `Bridge Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recommendation`
--

INSERT INTO `recommendation` (`RecId`, `BridgeId`, `ScanDate`, `Remaining Lifespan`, `Durability`, `Status`, `Bridge Name`) VALUES
(1, 1, '2025-04-10', 76.27, 45.4096, 'remaining', 'Bridge A'),
(2, 2, '2025-04-10', 76.2247, 45.4584, 'remaining', 'Bridge A'),
(3, 3, '2025-04-10', 75.1494, 44.3277, 'remaining', 'AdiBridge'),
(4, 4, '2025-04-10', 74.2175, 48.4204, 'remaining', 'MAYUR BRIDGE'),
(5, 5, '2025-04-11', 74.6993, 47.9618, 'remaining', 'Bridg b'),
(6, 6, '2025-04-11', 74.6993, 47.9618, 'remaining', 'Bridg b');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Name` varchar(200) NOT NULL,
  `Password` varchar(20) NOT NULL,
  `Contact no` varchar(15) NOT NULL,
  `Email Id` varchar(50) NOT NULL,
  `Birth Date` date NOT NULL,
  `Role` varchar(30) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Name`, `Password`, `Contact no`, `Email Id`, `Birth Date`, `Role`, `image`) VALUES
(1, 'Krushana', '123', '9765536153', 'Krushana123@gmail.com', '2025-01-21', 'Admin', 'C:\\xampp\\tomcat\\webapps\\Bridge Maintenance\\WEB-INF\\classes\\images\\Krushana.jpg'),
(2, 'Sudharshan', '123', '9765536153', 'krushana123@gmail.com', '2025-01-22', 'Admin', 'C:\\xampp\\tomcat\\webapps\\Bridge Maintenance\\WEB-INF\\classes\\images\\Sudharshan.jpg'),
(6, 'pratham', '123', '9765536159', 'shubhamdawange81@gmail.com', '2004-09-12', 'admin', 'C:\\xampp\\tomcat\\webapps\\Bridge Maintenance\\WEB-INF\\classes\\images\\pratham.jpg'),
(8, 'Aditya', '123456', '39309863938', 'aditya123@gmail.com', '2008-02-02', 'Engineer', 'C:\\xampp\\tomcat\\webapps\\Bridge Maintenance\\WEB-INF\\classes\\images\\Aditya.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bridge`
--
ALTER TABLE `bridge`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`maintenance id`);

--
-- Indexes for table `maintenance_history`
--
ALTER TABLE `maintenance_history`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `recommendation`
--
ALTER TABLE `recommendation`
  ADD PRIMARY KEY (`RecId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bridge`
--
ALTER TABLE `bridge`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `maintenance id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `maintenance_history`
--
ALTER TABLE `maintenance_history`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `recommendation`
--
ALTER TABLE `recommendation`
  MODIFY `RecId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
