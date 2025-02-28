-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

-- `drop all tables and constraints`
SET FOREIGN_KEY_CHECKS = 0;

drop table if exists Device;
drop table if exists Equipment;
drop table if exists Room;
drop table if exists Student;
drop table if exists Teacher;

-- `mariadb-leoleih-dev`.Room definition

CREATE TABLE `Room` (
                        `room_id` int(11) NOT NULL,
                        `room_category` int(11) DEFAULT NULL,
                        `return_date` timestamp NULL DEFAULT NULL,
                        `lent_from` int(11) DEFAULT NULL,
                        `notes` varchar(255) DEFAULT NULL,
                        PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- `mariadb-leoleih-dev`.Student definition

CREATE TABLE `Student` (
                           `stud_id` int(11) NOT NULL,
                           `stud_first_name` varchar(100) NOT NULL,
                           `stud_last_name` varchar(100) NOT NULL,
                           `stud_email` varchar(100) NOT NULL,
                           `stud_class` varchar(10) DEFAULT NULL,
                           PRIMARY KEY (`stud_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- `mariadb-leoleih-dev`.Teacher definition

CREATE TABLE `Teacher` (
                           `teacher_id` int(11) NOT NULL,
                           `teacher_first_name` varchar(100) NOT NULL,
                           `teacher_last_name` varchar(100) NOT NULL,
                           `teacher_email` varchar(100) NOT NULL,
                           PRIMARY KEY (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- `mariadb-leoleih-dev`.Device definition

CREATE TABLE `Device` (
                          `dev_id` int(11) NOT NULL,
                          `dev_category` int(11) DEFAULT NULL,
                          `dev_set` varchar(100) DEFAULT NULL,
                          `dev_type` varchar(100) DEFAULT NULL,
                          `dev_serial_nr` varchar(100) DEFAULT NULL,
                          `dev_asset_nr` varchar(100) DEFAULT NULL,
                          `return_date` timestamp NULL DEFAULT NULL,
                          `lent_from` int(11) DEFAULT NULL,
                          `notes` varchar(255) DEFAULT NULL,
                          PRIMARY KEY (`dev_id`),
                          KEY `Device_Student_FK` (`lent_from`),
                          CONSTRAINT `Device_Student_FK` FOREIGN KEY (`lent_from`) REFERENCES `Student` (`stud_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


-- `mariadb-leoleih-dev`.Equipment definition

CREATE TABLE `Equipment` (
                             `equ_id` int(11) NOT NULL,
                             `equ_category` int(11) NOT NULL,
                             `equ_type` varchar(100) NOT NULL,
                             `return_date` timestamp NULL DEFAULT NULL,
                             `lent_from` int(11) DEFAULT NULL,
                             `notes` varchar(255) DEFAULT NULL,
                             PRIMARY KEY (`equ_id`),
                             KEY `Equipment_Student_FK` (`lent_from`),
                             CONSTRAINT `Equipment_Student_FK` FOREIGN KEY (`lent_from`) REFERENCES `Student` (`stud_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;


INSERT INTO `Room` (`room_id`, `room_category`, `return_date`, `lent_from`, `notes`)
VALUES
    (1, 101, '2025-03-01 09:00:00', 1, 'Raum für Fotoshootings'),
    (2, 102, '2025-03-05 11:00:00', 2, 'Raum für Videoaufnahmen'),
    (3, 103, '2025-03-10 13:00:00', 3, 'Raum für Audioaufnahmen'),
    (4, 101, '2025-03-15 14:00:00', 4, 'Raum für Präsentationen'),
    (5, 104, '2025-03-20 16:00:00', 5, 'Raum für Videokonferenzen');

INSERT INTO `Student` (`stud_id`, `stud_first_name`, `stud_last_name`, `stud_email`, `stud_class`)
VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', '10A'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '10B'),
    (3, 'Mike', 'Johnson', 'mike.johnson@example.com', '11A'),
    (4, 'Sarah', 'Lee', 'sarah.lee@example.com', '11B'),
    (5, 'Alice', 'Williams', 'alice.williams@example.com', '12A');

INSERT INTO `Teacher` (`teacher_id`, `teacher_first_name`, `teacher_last_name`, `teacher_email`)
VALUES
    (1, 'Dr. Anna', 'Müller', 'anna.mueller@school.com'),
    (2, 'Prof. Thomas', 'Schneider', 'thomas.schneider@school.com'),
    (3, 'Ms. Julia', 'Weber', 'julia.weber@school.com'),
    (4, 'Mr. Michael', 'Bauer', 'michael.bauer@school.com'),
    (5, 'Mrs. Sophie', 'Klein', 'sophie.klein@school.com');

INSERT INTO `Device` (`dev_id`, `dev_category`, `dev_set`, `dev_type`, `dev_serial_nr`, `dev_asset_nr`, `return_date`, `lent_from`, `notes`)
VALUES
    (1, 1, 'Set 1', 'Foto', 'CANON12345', 'A001', '2025-03-01 10:00:00', 1, 'Canon EOS Kamera, sehr gut erhalten'),
    (2, 2, 'Set 2', 'Video', 'SONY987', 'A002', '2025-03-05 11:00:00', 2, 'Sony Alpha Videokamera, mit Zubehör'),
    (3, 3, 'Set 3', 'Audio', 'JBL456', 'A003', '2025-03-10 12:00:00', 3, 'JBL Lautsprecher, funktioniert einwandfrei'),
    (4, 1, 'Set 4', 'Foto', 'NIKON789', 'A004', '2025-03-15 14:00:00', 4, 'Nikon D3500, gut erhalten'),
    (5, 2, 'Set 5', 'Video', 'GOPRO321', 'A005', '2025-03-20 16:00:00', 5, 'GoPro Hero 9, einige Kratzer');

INSERT INTO `Equipment` (`equ_id`, `equ_category`, `equ_type`, `return_date`, `lent_from`, `notes`)
VALUES
    (1, 1, 'Stativ', '2025-03-01 10:00:00', 1, 'Stativ für Kameras, stabil und gut erhalten'),
    (2, 2, 'Mikrofon', '2025-03-05 11:00:00', 2, 'Kondensatormikrofon, für Videoaufnahmen geeignet'),
    (3, 1, 'Blitzlicht', '2025-03-10 12:00:00', 3, 'Blitzlicht für Fotoaufnahmen, funktioniert einwandfrei'),
    (4, 2, 'Gimbal', '2025-03-15 14:00:00', 4, 'Gimbal für Kamerastabilisierung, in sehr gutem Zustand'),
    (5, 1, 'Objektiv', '2025-03-20 16:00:00', 5, 'Weitwinkel-Objektiv für Fotoaufnahmen, einige Kratzer');
