-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 08, 2024 alle 09:47
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `databasebetacomgioco`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `evento`
--

CREATE TABLE `evento` (
  `id_Evento` int(11) NOT NULL,
  `titolo` varchar(50) NOT NULL,
  `data` date DEFAULT NULL,
  `descrizione` text NOT NULL,
  `luogo` varchar(255) NOT NULL,
  `immagine_evento` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `evento`
--

INSERT INTO `evento` (`id_Evento`, `titolo`, `data`, `descrizione`, `luogo`, `immagine_evento`) VALUES
(36, 'PaintBall', '2024-02-21', 'gioco sparatutto', 'https://www.google.com/maps/place/Paintball+Park/@45.0007781,7.4898705,17z/data=!3m1!4b1!4m6!3m5!1s0x47883e3aee7fdca1:0x2af689816a6f9ddf!8m2!3d45.0007781!4d7.4898705!16s%2Fg%2F11bvqgsk9m?hl=it&entry=ttu', 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_600,h_500/https://www.paintballpark-cerrina.com/wp-content/uploads/2019/04/vrr.png'),
(37, 'Rafting', '2024-04-22', '\nIl rafting è un\'avventurosa attività sportiva praticata in acque rapide e tumultuose su un\'imbarcazione gonfiabile chiamata raft. Questa esperienza emozionante coinvolge un gruppo di persone che lavorano insieme per navigare attraverso rapide, onde e ostacoli naturali lungo un fiume.\n\nI partecipanti indossano solitamente caschi e giubbotti di salvataggio per la sicurezza, mentre un istruttore esperto guida il raft e fornisce istruzioni al team. Il gruppo deve collaborare, remando in sincronia per affrontare le sfide del percorso, come rocce affioranti, rapide turbolente e rapide piene d\'azione.\n\nIl rafting offre un mix unico di adrenalina, natura selvaggia e spirito di squadra. È un\'esperienza eccitante che permette di connettersi con la natura e sfidare i limiti personali, mentre si naviga lungo fiumi mozzafiato.', '', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Rafting_em_Brotas.jpg/1200px-Rafting_em_Brotas.jpg'),
(55, 'Basket a Milano', '0000-00-00', 'Forza Oplimpia', 'https://www.google.com/maps/place/Forum+-+Milano/@45.4014159,9.1397198,16z/data=!3m2!4b1!5s0x4786c340e844be31:0x9112bc626b88f5dc!4m6!3m5!1s0x4786c3087f24ab5d:0x6cbf33cb191a7f9b!8m2!3d45.4014122!4d9.1422947!16zL20vMDdndGtz?entry=ttu', 'https://upload.wikimedia.org/wikipedia/it/6/6d/Olimpia_Milano_logo_2019.png'),
(148, 'SPA & relax', '0000-00-00', 'rilassante', 'https://www.google.com/maps/dir/45.088768,7.667712/qc+terme+torino+maps/@45.0766421,7.6496826,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x47886d5e1ad4dbbb:0x7817e14eb91efda8!2m2!1d7.6726755!2d45.0647337?entry=ttu', 'https://cms-eu.qcterme.com/sites/default/files/styles/page_social_image_crop_1_1/public/seo/2023-07/TORINO_ESTERNO_CON_GIOSTRA_DELLE_FAVOLE.jpg?h=940693a9&itok=Z1Ml9HeI');

-- --------------------------------------------------------

--
-- Struttura della tabella `proposte`
--

CREATE TABLE `proposte` (
  `id_Proposta` int(11) NOT NULL,
  `titolo` varchar(50) NOT NULL,
  `data` date NOT NULL,
  `descrizione` text NOT NULL,
  `luogo` varchar(255) NOT NULL,
  `immagine_evento` varchar(255) NOT NULL,
  `id_utente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `seleziona_date`
--

CREATE TABLE `seleziona_date` (
  `id_Date` int(11) NOT NULL,
  `id_Utente` int(11) NOT NULL,
  `id_Evento` int(11) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `seleziona_date`
--

INSERT INTO `seleziona_date` (`id_Date`, `id_Utente`, `id_Evento`, `date`) VALUES
(715, 27, 36, '2024-06-08'),
(716, 27, 36, '2024-06-09'),
(717, 27, 36, '2024-06-07'),
(718, 27, 36, '2024-06-08'),
(719, 27, 36, '2024-06-01'),
(829, 2, 36, '2024-06-08'),
(830, 2, 36, '2024-06-07'),
(831, 2, 36, '2024-06-09'),
(832, 2, 36, '2024-06-13'),
(926, 1, 36, '2024-06-08'),
(927, 1, 36, '2024-06-07'),
(928, 1, 36, '2024-06-06'),
(929, 1, 36, '2024-06-05'),
(930, 1, 36, '2024-06-20'),
(931, 1, 36, '2024-06-21'),
(932, 1, 36, '2024-06-29'),
(933, 1, 36, '2024-06-23'),
(934, 1, 36, '2024-06-30'),
(935, 1, 36, '2024-06-22'),
(936, 1, 36, '2024-06-28'),
(937, 1, 36, '2024-06-27'),
(949, 26, 37, '2024-06-08'),
(950, 26, 37, '2024-06-07'),
(951, 26, 37, '2024-06-09'),
(952, 26, 37, '2024-07-04'),
(953, 26, 37, '2024-06-14'),
(954, 26, 37, '2024-06-26'),
(955, 26, 37, '2024-06-25'),
(956, 26, 37, '2024-07-20'),
(957, 26, 37, '2024-06-28'),
(958, 26, 37, '2024-06-29'),
(959, 26, 37, '2024-06-13'),
(960, 26, 37, '2024-07-03');

-- --------------------------------------------------------

--
-- Struttura della tabella `utente`
--

CREATE TABLE `utente` (
  `id_Utente` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `cognome` varchar(50) NOT NULL,
  `email` varchar(125) NOT NULL,
  `password` varchar(512) NOT NULL,
  `disponibile` tinyint(1) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utente`
--

INSERT INTO `utente` (`id_Utente`, `nome`, `cognome`, `email`, `password`, `disponibile`, `admin`) VALUES
(1, 'Sandro', 'Maffiodo', 's.maffiodo@betacom.it', 'bd87948c04bc1b6e6714d5d16c1d418efa7e5fac5d1caee4d824b84f5848f0367fe50f5c89b3c7575d6d0065d60a84428452310741a53a6be01743d7f4b20353', 1, 1),
(2, 'Federico', 'Ferro', 'f.ferro@betacom.it', 'eeebe63454dd55a1d7c0026884962d99021bdb20be27ed269bac02ed375a494d3f8215ec968f8d3fcb0b951f4cc44a86b750dbff825cef867301788f31196b00', 0, 0),
(3, 'Lorenzo', 'Senis', 'l.senis@betacom.it', 'd445580e83acef9c59993e7f1f63da7d8a1fdc7693e9044c96a8e8ca7fa186e37dd8f96805d8ed49dad09aeff867b99c6bd3beffa4103c9bf9b8d8747020ef3a', 0, 0),
(4, 'Nicola', 'Vergara', 'n.vergara@betacom.it', 'a5d50eb7b12379e66dc823d4f59a81d412226a06c9d88eac95bc1ac678e0066141017c9ee01dabf8074b23ccc12c4b9c1fd7329f9ccf1a2e3f2a0f91f6fd405d', 0, 0),
(5, 'Salvatore', 'Castellana', 's.castellana@betacom.it', '51df841a13758dd61e9d041b65e112be1eacec3301e109915a2cd36d7374459fd9c6cbcaba9cf9807702185ccf290340b42fbb0733d60577fb540ab5ad9d7a46', 0, 0),
(6, 'Sefora', 'Maganuco', 's.maganuco@betacom.it', '93d877ae62a93ab769c94473f88abd0d6ef87827ceb1881881da8ff4ebf58b88409230ed73c2438d1d1a8b5f06ad76ba6ce1c25d57f989657ebbc307052ed25d', 0, 0),
(7, 'Simone', 'Cavaliere', 's.cavaliere@betacom.it', '46eb352fb4b6bc151ce5a37256c53863d46646f9a9c76f24c80044e42a9659d901354d2df99630920fa45726ab84ed0eee1e60397635dbeefa769ee3f400747f', 0, 0),
(8, 'Erika', 'Zennaro', 'e.zennaro@betacom.it', 'fbfca5213699bdd4fcf37601d88f122a6f1b19c4f54aa55b27a2adcbf6e09d12b4e72674a3cbebe2307b6cd3d894e034812571eb0b01a3e4191b67a7c48d9424', 0, 0),
(9, 'Costantino', 'Spano', 'c.spano@betacom.it', '8c3b86d92848d0258b1387996f5141a46d07611043f0b4c6d6a3aac7c29ce0df7203ccc3fbe4ee3d00972f9043ba57434d819116258804767f0843e74f1679f4', 0, 0),
(10, 'Stefano', ' Sticca', 's.gribaudo@betacom.it', '259fe80fb5ce170a7a510b12f45ac7ceab77d301e7e82d404bcc1a37f985cee60f288c9286346f506ca32f20c368a0bdd6732a9ac654c9be04104454aec927e1', 1, 0),
(12, 'Luis ', 'Cobas', 'l.cobasgomero@betacom.it', '2aa6ef82fe6db865b25015bfea231edb52b04f5265ffc4994d194546c5c3142f71b3adee4a6f20891466e0307b877fa49851181a338b335cea1f81522c9e8c49', 1, 0),
(13, 'Sara', 'Spaventa', 's.spaventa@betacom.it', 'bafe92a2642cb68faa020547103291a6eb17d6a5a482bf0cf70fa588a112d7b4927a895f7a2c9b5093cb127baa235a40bc294e9559a22e7ef712220c1a08e5ea', 1, 0),
(14, 'Monica', 'Hotea', 'm.hotea@betacom.it', '84250b971b87728aa4ab24cec405864ed9dee13436e008777ca1b5152fec6dba98c672210e3d4f4ea39cfd660b3a47fc16a398dd8e8571b144afc5d3a2a5e6d8', 1, 0),
(15, 'Alex', 'Giubileo', 'a.giubileo@betacom.it', '1126e61f3fcde3f61e090ccb19e446e7ebf61aeeaafffa569cdb5efa4c6db81e7c0d939346be0ac8405c0a724cee409ca2557765e47b8da959e64a79178a5de1', 1, 0),
(16, 'Guilherme', ' Lopes', 'g.lopes@betacom.it', '5f83078366db30bc399d16e074753ebcbad4dc09817e54ebc8901a53c84e9fab9ecc070802c9625b214e51768abd50690bdecc017be5d15aa80f447b72550660', 1, 0),
(17, 'Sara', 'Marcon', 's.marcon@betacom.it', 'bafe92a2642cb68faa020547103291a6eb17d6a5a482bf0cf70fa588a112d7b4927a895f7a2c9b5093cb127baa235a40bc294e9559a22e7ef712220c1a08e5ea', 1, 0),
(18, 'Chiara', 'Grosso', 'c.grosso@betacom.it', '3af1ccbfca538dc0484f595339497d62989883f5a44a98edf6970f957b4e4760bffbde7f6db93b3c1148a0b7cee29d860b7bda7cedb172e83547432b6badff6c', 1, 0),
(19, 'Denys', 'Ciavarella', 'd.ciavarella@betacom.it', 'c6f41bef2744ea881b1a5e1d6ac4d6a82d7f782957000dc5f0d08ccb8a6481409e6ea72b7a628725b0f9d715b0c0bdad616dd699ccf90c09e9cc75dd52b92ef4', 1, 0),
(20, 'Alissa', 'Mulas', 'a.mulas@betacom.it', 'c7fd314c0fe33092e3ff981656a0f416a08312f4d96f2e51cde8df550b69ee25ff2361d008f31abc3d5a4b030c9693baf59934dff7ebfa8e316b8d4d4ba31a67', 1, 0),
(21, 'Luca', 'Marcon', 'l.marcon@betacom.it', '33da2bb77435285643c8db1cd0bd98739095617d9de8fca26ad60a9d3dfcba654fd579cf41a84055dc4b13883ce66a7324a0ead8474f2be77e6190b18561b900', 1, 0),
(22, 'Davide', 'Germanà', 'd.germana@betacom.it', '1540cca7af9e61660137765d40522360ea6a43910e9454bebd60bcf9ca2b84c271d42fa5218a662946f6a01386e2a0b68c4256e81c41861ee0f769c684e8f393', 1, 0),
(23, 'Luca', 'Giannuzzo', 'l.giannuzzo@betacom.it', '33da2bb77435285643c8db1cd0bd98739095617d9de8fca26ad60a9d3dfcba654fd579cf41a84055dc4b13883ce66a7324a0ead8474f2be77e6190b18561b900', 1, 0),
(24, 'Matteo', 'Dedonno', 'm.dedonno@betacom.it', '08bcc090fe04be7da0049123353d48c4a6108467659ecb7e52e3facfb123dd80858c2268c5e229a0c5b3b898abd7aeabd88b389ce3a4025665606d3afae50d4e', 0, 0),
(25, 'Lorenzo', 'Pacioni', 'l.pacioni@betacom.it', 'd445580e83acef9c59993e7f1f63da7d8a1fdc7693e9044c96a8e8ca7fa186e37dd8f96805d8ed49dad09aeff867b99c6bd3beffa4103c9bf9b8d8747020ef3a', 1, 0),
(26, 'Lorenzo', 'Garnero', 'l.garnero@betacom.it', 'bd87948c04bc1b6e6714d5d16c1d418efa7e5fac5d1caee4d824b84f5848f0367fe50f5c89b3c7575d6d0065d60a84428452310741a53a6be01743d7f4b20353', 0, 0),
(27, 'Fabio', 'La Rosa', 'f.larosa@betacom.it', '7bf138ca77c13114f9466c2b66b967dacba02d3b9523ff16c4ee5aca98f8824c990494bd7b09908358d99b9b09f09082b0c769df714165b11482991538c4dc2d', 0, 0),
(63, 'Lorenzo', 'Daneo', 'l.daneo@betacom.it', 'd445580e83acef9c59993e7f1f63da7d8a1fdc7693e9044c96a8e8ca7fa186e37dd8f96805d8ed49dad09aeff867b99c6bd3beffa4103c9bf9b8d8747020ef3a', 0, 0),
(64, 'leonardo', 'griot', 'l.griot@betacom.it', '24775d5526e1f521ee85ba5ceb4253ea4d05ffa35b6848c2524cf76777f3777e05bb3879dd1fd73850425fce3339b7822ea889d7759be302e12fa36cf1ad38d6', 0, 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `voti`
--

CREATE TABLE `voti` (
  `id_Voto` int(11) NOT NULL,
  `id_Evento` int(11) DEFAULT NULL,
  `id_Utente` int(11) DEFAULT NULL,
  `voto` tinyint(1) DEFAULT NULL
) ;

--
-- Dump dei dati per la tabella `voti`
--

INSERT INTO `voti` (`id_Voto`, `id_Evento`, `id_Utente`, `voto`) VALUES
(181, 36, 1, 1),
(183, 55, 1, 1),
(184, 37, 1, 1),
(185, 36, 27, 1),
(186, 37, 27, 1),
(187, 55, 27, 1),
(188, 36, 2, 1),
(189, 55, 26, 1),
(190, 37, 26, 1),
(191, 36, 26, 1);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id_Evento`);

--
-- Indici per le tabelle `proposte`
--
ALTER TABLE `proposte`
  ADD PRIMARY KEY (`id_Proposta`),
  ADD KEY `proposte_idfk_1` (`id_utente`);

--
-- Indici per le tabelle `seleziona_date`
--
ALTER TABLE `seleziona_date`
  ADD PRIMARY KEY (`id_Date`),
  ADD KEY `seleziona_date_ibfk_1` (`id_Evento`),
  ADD KEY `seleziona_date_ibfk_2` (`id_Utente`);

--
-- Indici per le tabelle `utente`
--
ALTER TABLE `utente`
  ADD PRIMARY KEY (`id_Utente`);

--
-- Indici per le tabelle `voti`
--
ALTER TABLE `voti`
  ADD PRIMARY KEY (`id_Voto`),
  ADD KEY `voti_ibfk_1` (`id_Evento`),
  ADD KEY `voti_ibfk_2` (`id_Utente`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `evento`
--
ALTER TABLE `evento`
  MODIFY `id_Evento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=149;

--
-- AUTO_INCREMENT per la tabella `proposte`
--
ALTER TABLE `proposte`
  MODIFY `id_Proposta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `seleziona_date`
--
ALTER TABLE `seleziona_date`
  MODIFY `id_Date` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=961;

--
-- AUTO_INCREMENT per la tabella `utente`
--
ALTER TABLE `utente`
  MODIFY `id_Utente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- AUTO_INCREMENT per la tabella `voti`
--
ALTER TABLE `voti`
  MODIFY `id_Voto` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `proposte`
--
ALTER TABLE `proposte`
  ADD CONSTRAINT `proposte_idfk_1` FOREIGN KEY (`id_utente`) REFERENCES `utente` (`id_Utente`);

--
-- Limiti per la tabella `seleziona_date`
--
ALTER TABLE `seleziona_date`
  ADD CONSTRAINT `seleziona_date_ibfk_1` FOREIGN KEY (`id_Evento`) REFERENCES `evento` (`id_Evento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `seleziona_date_ibfk_2` FOREIGN KEY (`id_Utente`) REFERENCES `utente` (`id_Utente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limiti per la tabella `voti`
--
ALTER TABLE `voti`
  ADD CONSTRAINT `voti_ibfk_1` FOREIGN KEY (`id_Evento`) REFERENCES `evento` (`id_Evento`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `voti_ibfk_2` FOREIGN KEY (`id_Utente`) REFERENCES `utente` (`id_Utente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
