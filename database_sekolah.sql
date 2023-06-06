-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 06, 2023 at 12:12 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `database_sekolah`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `katasandi` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `email`, `katasandi`, `role`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'luci@666.com', '$2b$10$FCByjerGM3iXkA6fpNNbauaVynMSpqx7ZRLrnuc.YLzCmOkDDIOLW', 'admin', '2023-06-06 08:22:43', '2023-06-06 08:22:43');

-- --------------------------------------------------------

--
-- Table structure for table `data_siswas`
--

CREATE TABLE `data_siswas` (
  `id` int(11) NOT NULL,
  `tempatLahir` varchar(255) DEFAULT NULL,
  `tanggallahir` datetime DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230525030139-create-data-siswa.js'),
('20230525030257-create-siswa.js'),
('20230525072444-create-barang.js'),
('20230525073504-create-customer.js'),
('20230525073947-create-transaksi.js'),
('20230525081526-create-pembayaran.js'),
('20230525081649-create-pemesanan.js'),
('20230525084631-data_siswa.js'),
('20230606075516-create-admin.js');

-- --------------------------------------------------------

--
-- Table structure for table `siswas`
--

CREATE TABLE `siswas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tgl_lahir` varchar(255) DEFAULT NULL,
  `kelas` varchar(255) DEFAULT NULL,
  `alamat` varchar(255) DEFAULT NULL,
  `no_hp` varchar(255) DEFAULT NULL,
  `nama_ortu` varchar(255) DEFAULT NULL,
  `no_hp_ortu` varchar(255) DEFAULT NULL,
  `role` enum('admin') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `siswas`
--

INSERT INTO `siswas` (`id`, `name`, `tgl_lahir`, `kelas`, `alamat`, `no_hp`, `nama_ortu`, `no_hp_ortu`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'iridengki', 'jakarta', 'IPA', '', '', '', '', NULL, '2023-06-06 08:58:09', '2023-06-06 09:46:32'),
(6, 'michael2', 'jakarta', 'IPA', '', '', 'gatau', '', NULL, '2023-06-06 09:46:55', '2023-06-06 09:47:23'),
(7, 'exodia', 'jakarta', 'MTK', 'jl. jalan jalan', '088637541232', 'gatau', '086242134153', NULL, '2023-06-06 09:48:35', '2023-06-06 09:48:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `data_siswas`
--
ALTER TABLE `data_siswas`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `siswas`
--
ALTER TABLE `siswas`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `data_siswas`
--
ALTER TABLE `data_siswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `siswas`
--
ALTER TABLE `siswas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
