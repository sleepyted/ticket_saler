-- create the database
drop database if exists expressdb;
create database expressdb default character set utf8;
use expressdb;
/**
	begin create tables
*/

-- user table
drop table if exists t_user;
create table t_user(
	id int(16) not null auto_increment primary key,
    username varchar(256) not null,
    password varchar(1024) not null,
    tel varchar(64),
    update_date timestamp not null on update current_timestamp,
    create_date timestamp not null default current_timestamp,
    del_flag char(1) not null default '0'
    );
    
-- token table
drop table if exists t_token;
create table t_token(
	id int(16) not null auto_increment primary key,
    user_id int(16) not null,
    token_str varchar(1024) not null,
    create_date timestamp not null default current_timestamp,
    update_date timestamp not null on update current_timestamp
    );
    
    
-- table role
drop table if exists t_role;
create table t_role(
	id int(8) not null auto_increment primary key,
	role varchar(64) not null default 'guest'
);
-- init roles
INSERT INTO t_role(role) values('user');
INSERT INTO t_role(role) values('admin');
INSERT INTO t_role(role) values('guest');

