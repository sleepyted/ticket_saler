-- create the database
drop database if exists expressdb;
create database expressdb default character set utf8;
use expressdb;
/**
	begin create tables
*/

-- user table
drop table if exists t_user;
CREATE TABLE t_user (
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(256) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    tel VARCHAR(64),
    update_date TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    del_flag CHAR(1) NOT NULL DEFAULT '0'
);
    
-- token table
drop table if exists t_token;
CREATE TABLE t_token (
    -- id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(16) NOT NULL,
    token_str VARCHAR(1024) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
    
    
-- table role
drop table if exists t_role;
CREATE TABLE t_role (
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(64) NOT NULL
);
-- init roles
INSERT INTO t_role(role) values('user');
INSERT INTO t_role(role) values('admin');
INSERT INTO t_role(role) values('guest');

-- user <-> role table
drop table if exists t_user_role;
CREATE TABLE t_user_role(
    user_id INT(16) NOT NULL,
    role_id INT(16) NOT NULL,
    FOREIGN KEY user_id REFERENCES t_user(id),
    FOREIGN KEY role_id REFERENCES t_role(id)
);

--movie
drop table if exists t_movie;
CREATE TABLE t_movie(
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1024) NOT NULL UNIQUE,
    duration DATETIME NOT NULL,
    director VARCHAR(256),
    actors VARCHAR(1024),
    desc TEXT,
    show_date TIMESTAMP NOT NULL,
    out_date TIMESTAMP NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- theatre
drop table if exists t_theatre;
CREATE TABLE t_theatre(
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(1024) NOT NULL,
    location VARCHAR(1024) NOT NULL,
    tel VARCHAR(64),
    desc TEXT,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- room
drop table if exists t_room;
CREATE TABLE t_room(
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    theatre_id INT(16) NOT NULL,
    name VARCHAR(1024) NOT NULL,
    -- size INT(8) NOT NULL,
    row_size INT(2) NOT NULL,
    col_size INT(2) NOT NULL,
    desc TEXT,
    FOREIGN KEY theatre_id REFERENCES t_theatre(id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- movie ordered
drop table if exists t_platoon;
CREATE TABLE t_platoon(
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room_id INT(16) NOT NULL,
    movie_id INT(16) NOT NULL,
    price FLOAT(2) NOT NULL,
    show_time TIMESTAMP NOT NULL,
    FOREIGN KEY room_id REFERENCES t_room (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY movie_id REFERENCES t_movie(id) ON DELETE CASCADE ON UPDATE CASCADE
    
);

seat record
drop table if exists t_platoon_seat;
CREATE TABLE t_platoon_seat(
    -- seat_str VARCHAR(4) NOT NULL
    id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    platoon_id INT(16) NOT NULL,
    sold CHAR(1) NOT NULL DEFAULT '0', -- 0 on sale   1  sold
    seat_row INT(2) NOT NULL,
    seat_col INT(2) NOT NULL
);

-- ticket table
drop table if exists t_ticket;
CREATE TABLE t_ticket(
    uuid VARCHAR(256) NOT NULL PRIMARY KEY,
    user_id INT(16) NOT NULL,
    platoon_id INT(16) NOT NULL,
    seat_id INT(16) NOT NULL,
    -- movie_id INT(16) NOT NULL,
    -- theatre_id INT(16) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status CHAR(1) NOT NULL DEFAULT '0',   -- 0 unused 1 used
    FOREIGN KEY user_id REFERENCES t_user(id),
    FOREIGN KEY platoon_id REFERENCES t_platoon(id),
    FOREIGN KEY seat_id REFERENCES t_platoon_seat(id)
    -- FOREIGN KEY movie_id REFERENCES t_movie(id)
);

-- add test user data
INSERT INTO t_user (username, password, tel) VALUES('ted', '111', '88888888');
INSERT INTO t_user (username, password, tel) VALUES('tom', '222', '66666666');
INSERT INTO t_user (username, password, tel, del_flag) VALUES('del', '333', '00000000', '1');

-- add test threatre data
INSERT INTO t_theatre(name, location, tel , desc)
    VALUES('万达国际影城(CBD万达店)', '市北区延吉路112号CBD万达广场', '0532-55563939', '暂无');
INSERT INTO t_theatre(name, location, tel , desc)
    VALUES('万达国际影城(台东万达店) ', '市北区台东三路63号万达广场4楼', '0532-83625656', '暂无');
INSERT INTO t_theatre(name, location, tel , desc)
    VALUES('中国电影院', '市南区中山路97号', '0532-82864319', '暂无');