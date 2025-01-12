-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (1,null,'photo_camera','F01','Parasonic',null,'Ladegrät','123456');

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (2,null,'video_camera','V01','Camcorder',null,'','123456');

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (1,null,'photo_camera','F02','ParasonicX',null,'SD Karte','123456');

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (2,null,'video_camera','V02','Camcorder',null,'','123456');

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (3,null,'audio_device','A01','microphone',null,'','123456');

insert into Item (item_category, return_date, item_description, item_set, item_type, lent_from, notes, serial_nr)
values (3,null,'audio_device','A02','microphone',null,'','123456');