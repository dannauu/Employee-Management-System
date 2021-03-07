drop database if exists employeeDB;

create database employeeDB;

use employeeDB;

create table department (
    id int not null auto_increment,
    Name varchar(30),
    primary key (id)
)

create table employeeRole (
    id int not null auto_increment,
    Title varchar(30),
    Salary decimal(5,2),
    DepartmentID int,
    primary key (id)
)

create table employee (
    id int not null auto_increment,
    FirstName varchar(30),
    LastName varchar(30)
    RoleID int,
    ManagerID int,
    primary key (id)
)