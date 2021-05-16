-- Deletes previous database with this title if it exists
DROP DATABASE IF EXISTS employeeTrackerDB;

-- Creates a new database with this title
CREATE DATABASE employeeTrackerDB;

-- Uses the database with this title
USE employeeTrackerDB;

-- Creates a table for departments
CREATE TABLE department (
    id INT, 
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Creates a table for roles
CREATE TABLE role (
    id INT, 
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT
    PRIMARY KEY (id)
);

-- Creates a table for employees
CREATE TABLE employee (
    id INT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);