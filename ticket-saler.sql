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
INSERT INTO t_user (username, password, tel) VALUES('ted', '111', '88888888');
INSERT INTO t_user (username, password, tel) VALUES('tom', '222', '66666666');
INSERT INTO t_user (username, password, tel, del_flag) VALUES('del', '333', '00000000', '1');
    
-- token table
drop table if exists t_token;
CREATE TABLE t_token (
    -- id INT(16) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(16) NOT NULL PRIMARY KEY,
    token_str VARCHAR(1024) NOT NULL,
    create_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_date TIMESTAMP NOT NULL ON UPDATE CURRENT_TIMESTAMP
);
    
    
-- table role
drop table if exists t_role;
CREATE TABLE t_role (
    id INT(8) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(64) NOT NULL DEFAULT 'guest'
);
-- init roles
INSERT INTO t_role(role) values('user');
INSERT INTO t_role(role) values('admin');
INSERT INTO t_role(role) values('guest');

