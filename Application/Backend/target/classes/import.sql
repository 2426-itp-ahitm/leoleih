-- drop all tables and constraints
SET FOREIGN_KEY_CHECKS = 0;

drop table if exists Device;
drop table if exists Equipment;
drop table if exists Room;
drop table if exists Student;
drop table if exists Teacher;
-- mariadb-leoleih-dev.Room definition

CREATE TABLE Room (
                      room_id BIGINT(11) NOT NULL,
                      room_category int(11) DEFAULT NULL,
                      return_date timestamp NULL DEFAULT NULL,
                      lent_from BIGINT(11) DEFAULT NULL,
                      notes varchar(255) DEFAULT NULL
                      -- PRIMARY KEY (room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- mariadb-leoleih-dev.Student definition

CREATE TABLE Student (
                         stud_id BIGINT(11) NOT NULL,
                         stud_first_name varchar(100) NOT NULL,
                         stud_last_name varchar(100) NOT NULL,
                         stud_email varchar(100) NOT NULL,
                         stud_class varchar(10) DEFAULT NULL
                         -- PRIMARY KEY (stud_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- mariadb-leoleih-dev.Teacher definition

CREATE TABLE Teacher (
                         teacher_id BIGINT(11) NOT NULL,
                         teacher_first_name varchar(100) NOT NULL,
                         teacher_last_name varchar(100) NOT NULL,
                         teacher_email varchar(100) NOT NULL
                         -- PRIMARY KEY (teacher_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- mariadb-leoleih-dev.Device definition

CREATE TABLE Device (
                        dev_id BIGINT(11) NOT NULL,
                        dev_category bigint(11) DEFAULT NULL,
                        dev_set varchar(100) DEFAULT NULL,
                        dev_type varchar(100) DEFAULT NULL,
                        dev_serial_nr varchar(100) DEFAULT NULL,
                        dev_asset_nr varchar(100) DEFAULT NULL,
                        return_date timestamp NULL DEFAULT NULL,
                        lent_from BIGINT(11) DEFAULT NULL,
                        notes varchar(255) DEFAULT NULL
                        -- PRIMARY KEY (dev_id),
                        -- KEY Device_Student_FK (lent_from),
                        -- CONSTRAINT Device_Student_FK FOREIGN KEY (lent_from) REFERENCES Student (stud_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- mariadb-leoleih-dev.Equipment definition

CREATE TABLE Equipment (
                           equ_id BIGINT(11) NOT NULL,									        equ_set varchar(10) NOT NULL,
                           equ_category bigint(11) NOT NULL,
                           equ_type varchar(100) NOT NULL,
                           return_date timestamp NULL DEFAULT NULL,
                           lent_from bigint(11) DEFAULT NULL,
                           notes varchar(255) DEFAULT NULL
                           -- PRIMARY KEY (equ_id),
                           -- KEY Equipment_Student_FK (lent_from),
                           -- CONSTRAINT Equipment_Student_FK FOREIGN KEY (lent_from) REFERENCES Student (stud_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `Device` (`dev_id`, `dev_category`, `dev_set`, `dev_type`, `dev_serial_nr`, `dev_asset_nr`, `return_date`, `lent_from`, `notes`)
VALUES
    (1, 1, 'F01', 'Nikon D60, 18-55mm + Blitz', '6045864', '3120004027030000', NULL, NULL, '+ 2. Objektiv 55m-200mm'),
    (2, 1, 'F02', 'Nikon D5000, 18-200mm + Blitz', '6552916', '3120004037680000', NULL, NULL, 'Blitz ist b. Gerd'),
    (3, 1, 'F03', 'Nikon D5100, 18-105mm + Blitz', '6069276', '3120028592590000', NULL, NULL, ''),
    (4, 1, 'F04', 'Nikon D5100, 18-105mm', '6398280', '3120004039640000', NULL, NULL, ''),
    (5, 1, 'F05', 'Nikon D5100, 18-105mm', '6639166', NULL, NULL, NULL, 'Nicht im Schulinventar'),
    (6, 1, 'F06', 'Nikon D90, 18-105mm', '6940078', '3120028592610000', NULL, NULL, ''),
    (7, 1, 'F07', 'Nikon D90, 18-105mm', '6939828', '3120028592600000', NULL, NULL, 'ausgeschieden'),
    (8, 1, 'F11', 'Nikon D3100, 18-105mm', '1166939', '4000002182460000', NULL, NULL, ''),
    (9, 1, 'F12', 'Nikon D3100, 18-105mm', '1166917', '4000002182470000', NULL, NULL, 'ausgeschieden'),
    (10, 1, 'F13', 'Nikon D3100, 18-105mm', '1166458', '4000002182480000', NULL, NULL, ''),
    (11, 1, 'F14', 'Nikon D3100, 18-105mm', '1166936', '4000002182490000', NULL, NULL, ''),
    (12, 1, 'F15', 'Nikon D3100, 18-105mm', '1166468', '4000000962830000', NULL, NULL, ''),
    (13, 1, 'F16', 'Nikon D3100, 18-105mm', '1166470', '4000000962840000', NULL, NULL, ''),
    (14, 1, 'F17', 'Nikon D3100, 18-105mm', '1166937', '4000000962850000', NULL, NULL, ''),
    (15, 1, 'F18', 'Nikon D3100, 18-105mm', '1264351', '4000000962860000', NULL, NULL, ''),
    (16, 1, 'F19', 'Nikon D3100, 18-105mm', '1264381', '4000000962870000', NULL, NULL, ''),
    (17, 1, 'F20', 'Nikon D3100, 18-105mm', '1228520', '4000000962880000', NULL, NULL, ''),
    (18, 1, 'F21', 'Nikon D3100, 18-105mm', '1264386', '4000000962890000', NULL, NULL, ''),
    (19, 1, 'F22', 'Nikon D3200, 18-105mm', '7458062', '4000005931520000', NULL, NULL, ''),
    (20, 1, 'F23', 'Nikon D3200, 18-105mm', '7458064', '4000005931510000', NULL, NULL, '??'),
    (21, 1, 'F24', 'Nikon D3200, 18-105mm', '7458166', '4000005931500000', NULL, NULL, ''),
    (22, 1, 'F25', 'Nikon D3200, 18-105mm', '7458761', '4000005931490000', NULL, NULL, ''),
    (23, 1, 'F26', 'Nikon D3200, 18-105mm', '7458768', '4000005931480000', NULL, NULL, ''),
    (24, 1, 'F27', 'Nikon D3200, 18-105mm', '7458682', '4000005931470000', NULL, NULL, ''),
    (25, 1, 'F28', 'Nikon D3200, 18-105mm', '7458767', '4000005931460000', NULL, NULL, ''),
    (26, 1, 'F29', 'Nikon D3200, 18-105mm', '7458033', '4000005931450000', NULL, NULL, ''),
    (27, 1, 'F30', 'Nikon D3200, 18-105mm', '7458143', '4000005931440000', NULL, NULL, 'fehlt - wird ersetzt'),
    (28, 1, 'F31', 'Nikon D3200, 18-105mm', '7458065', '4000005931430000', NULL, NULL, ''),
    (29, 1, 'F32', 'Nikon D3300, 18-105mm', '6772745', '4000009759380000', NULL, NULL, ''),
    (30, 1, 'F33', 'Nikon D3300, 18-105mm', '6772802', '4000009759390000', NULL, NULL, ''),
    (31, 1, 'F34', 'Nikon D3300, 18-105mm', '6786748', '4000009759400000', NULL, NULL, ''),
    (32, 1, 'F35', 'Nikon D3300, 18-105mm', '6787107', '4000009908190000', NULL, NULL, ''),
    (33, 1, 'F36', 'Nikon D3300, 18-105mm', '6204885', '4000009908200000', NULL, NULL, ''),
    (34, 1, 'F37', 'Nikon D3400, 18-105', '6316586', '4000015801550', NULL, NULL, 'wurde 05/2023 von S. ersetzt'),
    (35, 1, 'F38', 'Nikon D3400, 18-105', '6412163', '4000015801560', NULL, NULL, ''),
    (36, 1, 'F39', 'Nikon D3400, 18-105', '6412227', '4000015801570', NULL, NULL, ''),
    (37, 1, 'F40', 'Nikon D3500, 18-105mm', '6052274', '400001782637', NULL, NULL, 'und Objektiv 70-300mm'),
    (38, 1, 'F41', 'Nikon D5600, 18-105mm', '6133387', '400001782640', NULL, NULL, 'und Objektiv 70-300mm'),
    (39, 2, 'FS01', 'Fujifilm XT20 15-45mm', '8BQ08399', '1791561', NULL, NULL, ''),
    (40, 2, 'FS02', 'Fujifilm XT20 15-45mm', '8BQ19291', '1791562', NULL, NULL, ''),
    (41, 2, 'FS03', 'Fujifilm XT20 15-45mm', '8BQ19306', '1791563', NULL, NULL, ''),
    (42, 2, 'FS04', 'Fujifilm XT20 15-45mm Zoom Set', '8BQ11684', '1791573', NULL, NULL, 'Zoom 50-230mm 9AA12186'),
    (43, 2, 'FS05', 'Fujifilm XT20 15-45mm Zoom Set', '8BQ07322', '1791574', NULL, NULL, 'Zoom 50-230mm7DA084864'),
    (44, 2, 'FS06', 'Fujifilm XT30 15-45mm', NULL, NULL, NULL, NULL, ''),
    (45, 2, 'FS07', 'Fujifilm XT30 15-45mm', NULL, NULL, NULL, NULL, ''),
    (46, 2, 'FS08', 'Fujifilm XT30 15-45mm', NULL, NULL, NULL, NULL, ''),
    (47, 2, 'FS09', 'Fujifilm XT30 15-45mm', NULL, NULL, NULL, NULL, ''),
    (48, 3, 'VK 01', 'Panasonic SD 66 (schwarz)', 'COHL01316', NULL, NULL, NULL, ''),
    (49, 3, 'VK 02', 'Panasonic SD 66', 'JOHL00658', NULL, NULL, NULL, '+ Fernbedienung'),
    (50, 3, 'VK 03', 'Panasonic SD 99 (schwarz)', 'INV. 563/2011/1', NULL, NULL, NULL, ''),
    (51, 3, 'VK 04', 'Panasonic SD 99', 'C1HR00931', NULL, NULL, NULL, ''),
    (52, 3, 'VK 05', 'Panasonic SD 707', 'GOHX00065', NULL, NULL, NULL, ''),
    (53, 3, 'VK 06', 'Panasonic SD 707', 'B2HR00344', NULL, NULL, NULL, '?? Verloren??'),
    (54, 3, 'VK 07', 'Panasonic SD 707 (silber)', 'B2HR00694', NULL, NULL, NULL, ''),
    (55, 3, 'VK 08', 'Panasonic SD 707 (black)', 'S2HR01084', NULL, NULL, NULL, ''),
    (56, 3, 'VK 09', 'Panasonic HC-V727 (black)', 'CL3DA001385', NULL, NULL, NULL, 'WLAN-Funktion'),
    (57, 3, 'VK 10', 'Panasonic HC-V500', 'J2TWO1828', NULL, NULL, NULL, 'NEU(ErsatzRam)'),
    (58, 3, 'VK 11', 'Panasonic HC-V727', 'CR3JA001341', NULL, NULL, NULL, ''),
    (59, 3, 'VK 12', 'Panasonic HC-V727', 'CR3JA001343', NULL, NULL, NULL, ''),
    (60, 3, 'VK 13', 'Panasonic HC-V727', 'CR3SA003342', NULL, NULL, NULL, ''),
    (61, 3, 'VK 14', 'Panasonic HC-V727', 'CR3JA001342', NULL, NULL, NULL, ''),
    (62, 3, 'VK 15', 'Panasonic HC-V727', 'CR3JA001517', NULL, NULL, NULL, ''),
    (63, 3, 'VK 16', 'Panasonic HC-V727', 'CR3JA001518', NULL, NULL, NULL, '?? verloren ??'),
    (64, 3, 'VK 17', 'Panasonic HC-V727', 'CR3JA001519', NULL, NULL, NULL, ''),
    (65, 3, 'VK 18', 'Panasonic HC-V727', 'CR3JA001520', NULL, NULL, NULL, ''),
    (66, 3, 'VK 19', 'Panasonic HC-V727', 'CR3JA001521', NULL, NULL, NULL, ''),
    (67, 3, 'VK 20', 'Panasonic HC-V727', 'CR3JA001344', NULL, NULL, NULL, ''),
    (68, 3, 'VK 21', 'Panasonic HC-V727', 'CR3JA001340', NULL, NULL, NULL, ''),
    (69, 3, 'VK 22', 'Panasonic HCX-929', 'CE6FA001049', NULL, NULL, NULL, ''),
    (70, 3, 'VK 23', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (71, 3, 'VK 24', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (72, 3, 'VK 25', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (73, 3, 'VK 26', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (74, 3, 'VK 27', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (75, 3, 'VK 28', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (76, 3, 'VK 29', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (77, 3, 'VK 30', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (78, 3, 'VK 31', 'NULL', 'NULL', 'NULL', NULL, NULL, ''),
    (79, 4, 'VK 01', 'Pana SD 66', 'C0HL01316', '3120004036420000', NULL, NULL, 'rotes Schild auf Tasche fehlt, Informationskarte fehlt'),
    (80, 4, 'VK 02', 'Pana SD 66', 'JOHL00658', '3120004037720000', NULL, NULL, ''),
    (81, 4, 'VK 03', 'Pana SD 99', 'B1HR00361', '3120004039350000', NULL, NULL, '(HTL) 563/2011/1'),
    (82, 4, 'VK 04', 'Pana SD 99', 'C1HR00931', NULL, NULL, NULL, ''),
    (83, 4, 'VK 05', 'Pana SD 707', 'GOHX00065', '3102224037700000', NULL, NULL, ''),
    (84, 4, 'VK 06', 'Pana SD 707', 'B2HR00344', '3120025212990000', NULL, NULL, 'LG lädt nicht?'),
    (85, 4, 'VK 07', 'Pana SD 707 (silber)', 'B2HR00694', '3120028592660000', NULL, NULL, 'LG nicht beschriftet'),
    (86, 4, 'VK 08', 'Pana SD 707 (schwarz)', 'S2HR01084', '3120028691580000', NULL, NULL, 'LG nicht beschriftet, Kamerabeschriftung fehlt'),
    (87, 4, 'VK 09', 'Pana HC 727', 'CL3DA001385', NULL, NULL, NULL, 'LG nicht beschriftet'),
    (88, 4, 'VK 10', 'Pana HCX 929', 'CE6FA001049', '4000010221720000', NULL, NULL, ''),
    (89, 4, 'VK 11', 'Pana HC 727', 'CR3JA001341', '4000002891910000', NULL, NULL, ''),
    (90, 4, 'VK 12', 'Pana HC 500', 'JZTW01828', '4000002891900000', NULL, NULL, 'LG nicht beschriftet'),
    (91, 4, 'VK 13', 'Pana HC 727', 'CR3SA003342', '4000002891890000', NULL, NULL, 'LG nicht beschriftet'),
    (92, 4, 'VK 14', 'Pana HC 727', 'CR3JA001342', '4000002891880000', NULL, NULL, 'LG nicht beschriftet'),
    (93, 4, 'VK 15', 'Pana HC 727', 'CR3J1001517', '4000002891870000', NULL, NULL, 'LG nicht beschriftet'),
    (94, 4, 'VK 16', 'Pana HC 727', 'CR3JA001518', '4000002891860000', NULL, NULL, 'LG nicht beschriftet'),
    (95, 4, 'VK 17', 'Pana HC 727', 'CR3JA001519', '4000002891850000', NULL, NULL, 'LG nicht beschriftet'),
    (96, 4, 'VK 18', 'Pana HC 727', 'CR3JA001520', '4000002891840000', NULL, NULL, 'LG nicht beschriftet, Infokarte'),
    (97, 4, 'VK 19', 'Pana HC 727', 'CR3JA001341', '4000002891830000', NULL, NULL, 'LG nicht beschriftet'),
    (98, 4, 'VK 20', 'Pana HC 727', 'CR3JA001344', '4000002891820000', NULL, NULL, 'LG nicht beschriftet'),
    (99, 4, 'VK 21', 'Pana HC 727', 'CR3JA001340', '4000002891810000', NULL, NULL, 'LG nicht beschriftet'),
    (100, 4, 'VK 22', 'Pana HC 777', 'DN7SD001362', '4000011966940000', NULL, NULL, ''),
    (101, 4, 'VK 23', 'Pana HC 777', 'DN7GD002161', '4000011966950000', NULL, NULL, ''),
    (102, 4, 'VK 24', 'Pana HC 777', 'DN7HD001274', '4000011966960000', NULL, NULL, ''),
    (103, 4, 'VK 25', 'Pana HC 777', 'DN7SD001361', '4000011966970000', NULL, NULL, ''),
    (104, 4, 'VK 26', 'Pana HC 777', 'DN7HD001272', '4000011966980000', NULL, NULL, ''),
    (105, 4, 'VK 27', 'Pana HC 777', 'DN7HD001275', '4000011966990000', NULL, NULL, ''),
    (106, 4, 'VK 28', 'Pana HC 777', 'DH7HD001271', '4000011967000000', NULL, NULL, ''),
    (107, 4, 'VK 29', 'Pana HC 777', 'DN7HD001273', '4000011967010000', NULL, NULL, ''),
    (108, 4, 'VK 30', 'Pana HC 777', 'DN7GD002163', '4000011967020000', NULL, NULL, ''),
    (109, 5, 'A 01', 'Zoom H4', '124884', NULL, NULL, NULL, ''),
    (110, 5, 'A 02', 'Zoom H2', '27614', NULL, NULL, NULL, ''),
    (111, 5, 'A 03', 'Zoom H2', '480495', NULL, NULL, NULL, ''),
    (112, 5, 'A 04', 'Zoom H2', '480500', NULL, NULL, NULL, ''),
    (113, 5, 'A 05', 'Zoom H2', '446515', NULL, NULL, NULL, ''),
    (114, 5, 'A 06', 'Zoom H2n', '142341', NULL, NULL, NULL, ''),
    (115, 5, 'A 07', 'Zoom H1', '10006384', NULL, NULL, NULL, ''),
    (116, 5, 'A 08', 'Zoom H1', '10000411', NULL, NULL, NULL, ''),
    (117, 5, 'A 09', 'Zoom H1', '10006383', NULL, NULL, NULL, ''),
    (118, 5, 'A 10', 'ZoomH2n', '187164', NULL, NULL, NULL, ''),
    (119, 5, 'A 11', 'ZoomH2n', '204142', NULL, NULL, NULL, ''),
    (120, 5, 'A 12', 'ZoomH2n', '197886', NULL, NULL, NULL, ''),
    (121, 5, 'A 13', 'ZoomH2n', '458381', NULL, NULL, NULL, 'Geräte 197887 nach Verlust (Horner) ersetzt mit 00458381'),
    (122, 5, 'A14', 'ZoomH2n', '197890', NULL, NULL, NULL, ''),
    (123, 5, 'A15', 'ZoomH2n', '197889', NULL, NULL, NULL, ''),
    (124, 5, 'A16', 'ZoomH2n', '197888', NULL, NULL, NULL, ''),
    (125, 5, 'A17', 'ZoomH2n', '242190', NULL, NULL, NULL, ''),
    (126, 5, 'A18', 'ZoomH2n', '242168', NULL, NULL, NULL, ''),
    (127, 5, 'A19', 'ZoomH2n', '242169', NULL, NULL, NULL, ''),
    (128, 5, 'A20', 'ZoomH2n', '242426', NULL, NULL, NULL, ''),
    (129, 5, 'A21', 'ZoomH2n', '242167', NULL, NULL, NULL, ''),
    (130, 5, 'A22', 'ZoomH2n', '242188', NULL, NULL, NULL, ''),
    (131, 5, 'A23', 'ZoomH2n', '304251', NULL, NULL, NULL, ''),
    (132, 5, 'A24', 'ZoomH2n', '304252', NULL, NULL, NULL, ''),
    (133, 5, 'A25', 'ZoomH2n', '304256', NULL, NULL, NULL, ''),
    (134, 5, 'A26', 'ZoomH2n', '304257', NULL, NULL, NULL, ''),
    (135, 5, 'A27', 'ZoomH2n', '304258', NULL, NULL, NULL, ''),
    (136, 5, 'A28', 'ZoomH2n', '304259', NULL, NULL, NULL, ''),
    (137, 5, 'A29', 'ZoomH2n', '333132', NULL, NULL, NULL, ''),
    (138, 5, 'A30', 'ZoomH2n', '333137', NULL, NULL, NULL, ''),
    (139, 5, 'A31', 'ZoomH2n', '333139', NULL, NULL, NULL, ''),
    (140, 5, 'A32', 'ZoomH2n', '333046', NULL, NULL, NULL, ''),
    (141, 5, 'A33', 'ZoomH2n', '333041', NULL, NULL, NULL, ''),
    (142, 5, 'A34', 'ZoomH2n', '333138', NULL, NULL, NULL, ''),
    (143, 5, 'A35', 'ZoomH2n', '333131', NULL, NULL, NULL, 'fehlt (Stand 4.7.2018) Lehrer??'),
    (144, 5, 'A36', 'ZoomH2n', '333136', NULL, NULL, NULL, ''),
    (145, 5, 'A37', 'ZoomH2n', '333133', NULL, NULL, NULL, ''),
    (146, 5, 'A38', 'ZoomH2n', '333048', NULL, NULL, NULL, ''),
    (147, 5, 'A39', 'ZoomH2n', '366246', NULL, NULL, NULL, ''),
    (148, 5, 'A40', 'ZoomH2n', '366450', NULL, NULL, NULL, ''),
    (149, 5, 'A41', 'ZoomH2n', '366657', NULL, NULL, NULL, ''),
    (150, 5, 'A42', 'ZoomH2n', '391366', NULL, NULL, NULL, ''),
    (151, 5, 'A43', 'ZoomH2n', '366449', NULL, NULL, NULL, ''),
    (152, 5, 'A44', 'ZoomH2n', '366248', NULL, NULL, NULL, ''),
    (153, 5, 'A45', 'ZoomH2n', '379350', NULL, NULL, NULL, ''),
    (154, 5, 'A46', 'ZoomH2n', '379348', NULL, NULL, NULL, ''),
    (155, 5, 'A47', 'ZoomH2n', '379344', NULL, NULL, NULL, ''),
    (156, 5, 'A48', 'ZoomH2n', '379345', NULL, NULL, NULL, ''),
    (157, 5, 'A49', 'ZoomH2n', '379349', NULL, NULL, NULL, ''),
    (158, 5, 'A50', 'ZoomH2n', '379185', NULL, NULL, NULL, ''),
    (159, 5, 'A51', 'ZoomH2n', '423495', NULL, NULL, NULL, ''),
    (160, 5, 'A52', 'ZoomH2n', '423182', NULL, NULL, NULL, ''),
    (161, 5, 'A53', 'ZoomH2n', '423492', NULL, NULL, NULL, ''),
    (162, 5, 'A54', 'ZoomH2n', '422989', NULL, NULL, NULL, ''),
    (163, 5, 'A55', 'ZoomH2n', '423496', NULL, NULL, NULL, ''),
    (164, 5, 'A56', 'ZoomH2n', '440502', NULL, NULL, NULL, ''),
    (165, 5, 'A57', 'ZoomH2n', '437951', NULL, NULL, NULL, ''),
    (166, 5, 'A58', 'ZoomH2n', '457800', NULL, NULL, NULL, ''),
    (167, 5, 'A59', 'ZoomH2n', '457794', NULL, NULL, NULL, ''),
    (168, 5, 'A60', 'ZoomH2n', '458663', NULL, NULL, NULL, ''),
    (169, 5, 'A61', 'ZoomH2n', '458664', NULL, NULL, NULL, ''),
    (170, 5, 'A62', 'ZoomH2n', '457795', NULL, NULL, NULL, ''),
    (171, 5, 'A63', 'ZoomH2n', '458665', NULL, NULL, NULL, ''),
    (172, 5, 'A64', 'ZoomH2n', '457799', NULL, NULL, NULL, ''),
    (173, 5, 'A81', 'RodeFunkset', '224673', NULL, NULL, NULL, ''),
    (174, 5, 'A82', 'RodeFunkset', '224700', NULL, NULL, NULL, ''),
    (175, 5, 'A83', 'RodeFunkset', '370323', NULL, NULL, NULL, ''),
    (176, 5, 'A84', 'RodeFunkset', '369551', NULL, NULL, NULL, ''),
    (177, 5, 'A-91', 'X-Vive Funks.', 'WAR19122001076', NULL, NULL, NULL, ''),
    (178, 5, 'A-92', 'X-Vive Funks.', 'WAR19122001348', NULL, NULL, NULL, ''),
    (179, 6, 'PVS 01', 'Camcorder Panasonic AG DVX200', NULL, '4000009657990000', NULL, NULL, 'Zubehör: Ladegerät, Akku, schwarzes Tuch, Extrazubehör: 1x Kameratasche Manfrotto, 1x Doppelschnellladegerät, 2x großer Akku, Rode Richtmikrofon (mit Stativhalterung, Popschutz, Tasche und XLR-Kabel), Dedolight-Kopflicht (siehe VL 10), Gaffer-Tape'),
    (180, 6, 'PVS 02', 'Panasonic Lumix DCM-GH4 schwarz', 'WG7SG001104', '4000011940290000', NULL, NULL, 'Zubehör: 1x Tragetasche, 1x Akku, 1x Ladekabel, 1x Objektivadapter Metabones Speedboost XL Canon EF/MFT (VO 03)'),
    (181, 6, 'PVS 03', 'Action Cam Gopro Hero5 black', 'C3161325316615', '4000011940320000', NULL, NULL, 'Zubehör: 1x Trageköfferchen, 1x Doppelladestation, 2 Klebefüße, 1x Standfuß+Platte, 2x USB-Ladekabel, Speicherkarte (SanDisk Ultra, 64 GB MicroSD, XC1), 1x Reinigungstuch'),
    (182, 6, 'PVS 04', 'Kamera Samsung Galaxy Gear 360 VR-Cam', 'RFAJ500LL3K', '4000011940330000', NULL, NULL, 'Zubehör: 1x Akku, 1x Ladekabel, 1x klappbarer Standfuß, 1x Software Code'),
    (183, 6, 'PVS 05', 'Blackmagic Cinema Pocket', '5058940', NULL, NULL, NULL, 'Zubehör: 2x SSD-Festplatte (USB-C), 1x Objektivadapter Metabones Speedboost XL Canon EF/MFT (VO 06), 1x Festplattenhalterung, 1x Kameratasche, 1x Ladekabel, 1x USB-C auf USB-C Kabel');


INSERT INTO `Equipment` (`equ_id`, `equ_set`, `equ_category`, `equ_type`, `return_date`, `lent_from`, `notes`)
VALUES
    (1, 'FZ-01', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (2, 'FZ-02', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (3, 'FZ-03', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (4, 'FZ-04', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (5, 'FZ-05', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (6, 'FZ-06', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (7, 'FZ-07', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (8, 'FZ-08', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (9, 'FZ-09', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (10, 'FZ-10', 1, 'Infrarot Fernauslöser f. Fotoapparate', NULL, NULL, 'ohne Schularchivnummer'),
    (11, 'S 01', 2, 'Manfrotto 756B', NULL, NULL, ''),
    (12, 'S 02', 2, 'Manfrotto 190 XB', NULL, NULL, ''),
    (13, 'S 03', 2, 'Manfrotto 190 XB', NULL, NULL, ''),
    (14, 'S 04', 2, 'Manfrotto 128 RC', NULL, NULL, 'Stativplatte fehlt'),
    (15, 'S 05', 2, 'Manfrotto 128 RC', NULL, NULL, 'fehlt'),
    (16, 'S 06', 2, 'Hama Profil 76', NULL, NULL, '1 Fußabdeckung fehlt'),
    (17, 'S 07', 2, 'Hama Profil 76', NULL, NULL, ''),
    (18, 'S 08', 2, 'Einbeinstativ „Noname“', NULL, NULL, ''),
    (19, 'S 09', 2, 'Vivitar (Leihgabe Baar)', NULL, NULL, ''),
    (20, 'S 10', 2, 'Walimex 3530', NULL, NULL, ''),
    (21, 'S 11', 2, 'Walimex 3570', NULL, NULL, ''),
    (22, 'S 12', 2, 'Walimex 3670', NULL, NULL, ''),
    (23, 'S 13', 2, 'Walimex 3570', NULL, NULL, 'KAPUTT - ausgeschieden'),
    (24, 'S 14', 2, 'Walimex 3570', NULL, NULL, ''),
    (25, 'S 15', 2, 'Walimex 3570', NULL, NULL, ''),
    (26, 'S 16', 2, 'Walimex 3570', NULL, NULL, ''),
    (27, 'S 17', 2, 'Manfrotto MVH 500 A', NULL, NULL, 'Ö Pickerl auf Stativ selbst'),
    (28, 'S 18', 2, 'Mantona Dolomit 1300', NULL, NULL, 'Ö Pickerl auf Stativ selbst'),
    (29, 'S 19', 2, 'Profi Stativ Ravelli', NULL, NULL, 'Ö Pickerl auf Stativ selbst'),
    (30, 'S 20', 2, 'Walimex Pro', NULL, NULL, 'Grünes Pickerl fehlt (gelb vorhanden)'),
    (31, 'S 21', 2, 'Walimex 3570', NULL, NULL, ''),
    (32, 'S 22', 2, 'Walimex 3570', NULL, NULL, ''),
    (33, 'S 23', 2, 'Walimex 3570', NULL, NULL, ''),
    (34, 'S 24', 2, 'Walimex 3570', NULL, NULL, ''),
    (35, 'S 25', 2, 'Walimex 3570', NULL, NULL, ''),
    (36, 'S 26', 2, 'Walimex 3570', NULL, NULL, ''),
    (37, 'S 27', 2, 'Walimex 3570', NULL, NULL, ''),
    (38, 'S 28', 2, 'Walimex 3570', NULL, NULL, ''),
    (39, 'S 29', 2, 'Walimex 3570', NULL, NULL, ''),
    (40, 'S 30', 2, 'Walimex 3570', NULL, NULL, ''),
    (41, 'VZ 01', 3, 'LED Scheinwerfer Thomann', NULL, NULL, 'Pickerl auf Gerät'),
    (42, 'VZ 02', 3, 'LED Scheinwerfer Thomann', NULL, NULL, 'Pickerl auf Gerät'),
    (43, 'VZ 03', 3, 'LED Scheinwerfer Thomann', NULL, NULL, 'Pickerl auf Gerät'),
    (44, 'VZ 04', 3, 'LED Scheinwerfer Thomann', NULL, NULL, 'Pickerl auf Gerät'),
    (45, 'VZ 05', 3, 'Ravelli Stativ-Wagen', NULL, NULL, ''),
    (46, 'VZ 06', 3, 'TARION Kamera-Slider', NULL, NULL, 'Kein Pickerl drauf'),
    (47, 'VZ 07', 3, 'LED Profi-Lampe', NULL, NULL, ''),
    (48, 'VZ 08', 3, 'LED Profi-Lampe', NULL, NULL, ''),
    (49, 'VZ 09', 3, 'LED Profi-Lampe', NULL, NULL, 'Kein Pickerl'),
    (50, 'VZ 10', 3, 'Kamera-Kran', NULL, NULL, ''),
    (51, 'VZ 11', 3, 'Led Kopflicht', NULL, NULL, ''),
    (52, 'VZ 12', 3, '360 Grad Drehkopf', NULL, NULL, ''),
    (53, 'VZ 13', 3, 'Koffertasche für 3-er LED-Set', NULL, NULL, ''),
    (54, 'S 01', 4, 'Manfrotto 756B (mit Kugelkopf)', NULL, NULL, ''),
    (55, 'S 02', 4, 'Manfrotto 190 XB', NULL, NULL, ''),
    (56, 'S 03', 4, 'Manfrotto 190 XB', NULL, NULL, ''),
    (57, 'S 04', 4, 'Manfrotto 128 RC', NULL, NULL, 'Stativplatte fehlt'),
    (58, 'S 05', 4, 'Manfrotto 128 RC', NULL, NULL, 'fehlt'),
    (59, 'S 06', 4, 'Hama Profil 76', NULL, NULL, '1 Fußabdeckung fehlt'),
    (60, 'S 07', 4, 'Hama Profil 76', NULL, NULL, ''),
    (61, 'S 08', 4, 'Einbeinstativ „Noname“', NULL, NULL, ''),
    (62, 'S 09', 4, 'Vivitar (Leihgabe Baar)', NULL, NULL, ''),
    (63, 'S 10', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (64, 'S 11', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (65, 'S 12', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Tasche fehlt'),
    (66, 'S 13', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Tasche fehlt'),
    (67, 'S 14', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Tasche leicht beschädigt'),
    (68, 'S 15', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Stativplatte nicht voll funktionstüchtig, Tasche kaputt'),
    (69, 'S 16', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (70, 'S 17', 4, 'Videostativ Manfrotto MVK500AM', NULL, NULL, ''),
    (71, 'S 18', 4, 'Videostativ Mantona 18636 Dolomit 1300', NULL, NULL, ''),
    (72, 'S 19', 4, 'Video Kamerastativ Ravelli Photo AVTP 75mm', NULL, NULL, ''),
    (73, 'S 20', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (74, 'S 21', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Tasche fehlt'),
    (75, 'S 22', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'Tasche fehlt'),
    (76, 'S 23', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (77, 'S 24', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (78, 'S 25', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (79, 'S 26', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (80, 'S 27', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (81, 'S 28', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (82, 'S 29', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (83, 'S 30', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, ''),
    (84, 'S 31', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (85, 'S 32', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (86, 'S 33', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (87, 'S 34', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (88, 'S 35', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (89, 'S 36', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (90, 'S 37', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (91, 'S 38', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (92, 'S 39', 4, 'Stativ Walimex WT-3570 m. 3D-Neiger', NULL, NULL, 'noch nicht beschriftet'),
    (93, 'SS 01', 5, 'Schwebestativ GlideCam HD1000', NULL, NULL, ''),
    (94, 'SS 02', 5, 'Schwebestativ Walimex pro 19442 StabyPod 120cm', NULL, NULL, ''),
    (95, 'SS 03', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (96, 'SS 04', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (97, 'SS 05', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (98, 'SS 06', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (99, 'SS 07', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (100, 'SS 08', 5, 'Schwebestativ Walimex pro easy Balance three', NULL, NULL, ''),
    (101, 'SS 09', 5, 'Video Rig Set Walimex 20017 Semi Pro', NULL, NULL, ''),
    (102, 'SS 10', 5, '3-Achsen-Handheld-Gimbalsystem DJI Ronin-M', NULL, NULL, '04H0076498 - Software.Nr.'),
    (103, 'SS 11', 5, 'Einhand-Gimbal DJI Ronin S inkl. Koffer und Zubehör', NULL, NULL, ''),
    (104, 'SS 12', 5, 'Stativwagen Ravelli Dolly Photo Professionelle ATD', NULL, NULL, 'Schild fehlt'),
    (105, 'SS 13', 5, 'Kamera-Slider TARION SliderDolly TR120', NULL, NULL, 'Pickerl fehlt'),
    (106, 'SS 14', 5, 'Kamera-Kran', NULL, NULL, ''),
    (107, 'SS 15', 5, 'Stativkopf mantona Turnaround 360 Automatic', NULL, NULL, ''),
    (108, 'SS 16', 5, 'Feiyu G5 Gimbal für Gopro', NULL, NULL, ''),
    (109, 'VL 01', 6, 'LED Scheinwerfer Thomann', NULL, NULL, ''),
    (110, 'VL 02', 6, 'LED Scheinwerfer Thomann', NULL, NULL, ''),
    (111, 'VL 03', 6, 'LED Scheinwerfer Thomann', NULL, NULL, ''),
    (112, 'VL 04', 6, 'LED Scheinwerfer Thomann', NULL, NULL, ''),
    (113, 'VL 05', 6, 'Foto/Video LED-Leuchte Walimex 312D (Led Kopflicht)', NULL, NULL, ''),
    (114, 'VL 06', 6, 'Bi-Color On-Camera-Leuchte LEDZILLA DLOBML-Bi (Led Kopflicht)', NULL, NULL, 'bei PSV dabei'),
    (115, 'VL 07', 6, 'Flächenleuchte F&V K4000s 3er-Set m. Transportkoffer', NULL, NULL, 'Inlaykarte fehlt'),
    (116, 'VL 08', 6, 'Walimex Lampenstativ', NULL, NULL, ''),
    (117, 'VL 09', 6, 'Walimex Lampenstativ', NULL, NULL, ''),
    (118, 'VL 10', 6, 'Walimex Lampenstativ', NULL, NULL, ''),
    (119, 'VO 01', 7, 'Objektiv Sigma 18-35mm 1,5 DC HSM', NULL, NULL, ''),
    (120, 'VO 02', 7, 'Objektiv Sigma 50-100mm 1,5 DC HSM', NULL, NULL, ''),
    (121, 'VO 03', 7, 'Metabones Speedboost XL Canon EF/MFT', NULL, NULL, ''),
    (122, 'VO 04', 7, 'Sigma AF 16mm 1,4 MFT', NULL, NULL, ''),
    (123, 'VO 05', 7, 'Sigma AF 18-35mm 1,8 DC HSM', NULL, NULL, ''),
    (124, 'VO 06', 7, 'Metabones Speedbooster XL EF/MFT', NULL, NULL, ''),
    (125, 'VZ 01', 8, 'Atomos Ninja Inferno', NULL, NULL, ''),
    (126, 'VZ 02', 8, 'DJI Focus Zubehör SP19', NULL, NULL, ''),
    (127, 'VZ 03', 8, 'Rode Video Mic Pro Rycote', NULL, NULL, ''),
    (128, 'VZ 04', 8, 'Rode Video Mic Pro', NULL, NULL, ''),
    (129, 'VZ 05', 8, 'Blackmagic Davinci Resolve Micro Panel', NULL, NULL, ''),
    (130, 'VZ 06', 8, 'Gopro Stativhalterung', NULL, NULL, ''),
    (131, 'VZ 07', 8, 'Gopro Saugnapf', NULL, NULL, ''),
    (132, 'VZ 08', 8, 'Gopro Pro bike seat rail mount', NULL, NULL, ''),
    (133, 'VZ 09', 8, 'Gopro Gooseneck', NULL, NULL, ''),
    (134, 'VZ 10', 8, 'Gopro Handlebar seatpost pole mount', NULL, NULL, ''),
    (135, 'VZ 11', 8, 'Ronin M Zubehörhalter exkl. Bolzen und Kugelkopf', NULL, NULL, ''),
    (136, 'VZ 12', 8, 'Helios Schraubklemme Mini', NULL, NULL, ''),
    (137, 'VZ 13', 8, 'Helios Bolzen', NULL, NULL, ''),
    (138, 'VZ 14', 8, 'Kugelkopf', NULL, NULL, ''),
    (139, 'VZ 15', 8, 'Helios Kugelkopf für GH4 Blitzschuh', NULL, NULL, ''),
    (140, 'VZ 16', 8, 'Joby Grop Tight Mount (Befestigung für Festplatte)', NULL, NULL, ''),
    (141, 'VZ 17', 8, 'G-Technology eV Series Reader Atomos Caddy Edt. Enclosure, Speichergehäuse', NULL, NULL, ''),
    (142, 'VZ 18', 8, 'Blackmagic DeckLink 8K Pro', NULL, NULL, ''),
    (143, 'VZ 19', 8, 'B I G Doppelschraube', NULL, NULL, ''),
    (144, 'VZ 20', 8, 'B I G Doppelschraube', NULL, NULL, ''),
    (145, 'VZ 21', 8, 'SDI Kabel 50cm', NULL, NULL, ''),
    (146, 'VZ 22', 8, 'Hosa XLR auf 3,5 Klinke Kabel, ca. 30cm', NULL, NULL, ''),
    (147, 'VZ 23', 8, 'Hosa XLR auf 3,5 Klinke Kabel, ca. 30cm', NULL, NULL, ''),
    (148, 'VZ 24', 8, 'Lexar SDXC 64GB UHS-II 2000x', NULL, NULL, ''),
    (149, 'VZ 25', 8, 'Lexar SDXC 64GB UHS-II 2000x', NULL, NULL, ''),
    (150, 'VZ 26', 8, 'Transcend ESD220C, 480 GB 410MB/Sec', NULL, NULL, ''),
    (151, 'VZ 27', 8, 'Transcend ESD220C, 480 GB 410MB/Sec', NULL, NULL, ''),
    (152, 'VZ 28', 8, 'Angelbird Atom X SSDMINI 500 GB SSD Festplatte für Atomos', NULL, NULL, ''),
    (153, 'VZ 29', 8, 'Angelbird Atom X SSDMINI 500 GB SSD Festplatte für Atomos', NULL, NULL, ''),
    (154, 'VZ 30', 8, 'Ronin M Battery Charger (Spare Part 29)', NULL, NULL, ''),
    (155, 'VZ 31', 8, 'Ronin M Ersatzakku 4S Battery (Spare Part 39)', NULL, NULL, ''),
    (156, 'VZ 32', 8, 'Ersatzakku für Blackmagic Cinema Pocket', NULL, NULL, ''),
    (157, 'VZ 33', 8, 'Ersatzakku für Panasonic GH4', NULL, NULL, '');

INSERT INTO `CART_ITEM`(`id`,`cart_id`,`dev_id`)
VALUES
    (1,1,1),
    (2,1,3),
    (3,1,111),
    (4,1,27);

alter table if exists Device
    modify column dev_asset_nr varchar(255);

alter table if exists Device
    modify column dev_serial_nr varchar(255);

alter table if exists Device
    modify column dev_set varchar(255);

alter table if exists Device
    modify column dev_type varchar(255);

alter table if exists Equipment
    modify column equ_category bigint;

alter table if exists Equipment
    modify column equ_set varchar(255);

alter table if exists Equipment
    modify column equ_type varchar(255);

alter table if exists Student
    modify column stud_class varchar(255);

alter table if exists Student
    modify column stud_email varchar(255);

alter table if exists Student
    modify column stud_first_name varchar(255);

alter table if exists Student
    modify column stud_last_name varchar(255);

alter table if exists Teacher
    modify column teacher_email varchar(255);

alter table if exists Teacher
    modify column teacher_first_name varchar(255);

alter table if exists Teacher
    modify column teacher_last_name varchar(255);

alter table if exists Cart
    add constraint FKikd5y94o6tuxyf4nsvdhht8f8
        foreign key (stud_id)
            references Student (stud_id);

alter table if exists Device
    add constraint FK871t8yilqrt1qn0icnyccit2i
        foreign key (lent_from)
            references Student (stud_id);

