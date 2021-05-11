-- Delete previous database with this title if it exists
DROP DATABASE IF EXISTS employee_trackerDB;

-- Create a new database with this title
CREATE DATABASE employee_trackerDB;

-- Use the database with this title
USE employee_trackerDB;

-- Create a table for departments
CREATE TABLE departments (
    id INT, 
    name VARCHAR(30),
    PRIMARY KEY (id)
);

-- Create a table for roles
CREATE TABLE roles (
    id INT, 
    title VARCHAR(30),
    salary DECIMAL(10,4),
    -- Just chose 10,4 for salary but not sure if it should be different
    department_id INT
    PRIMARY KEY (id)
);

-- Create a table for employees
CREATE TABLE employees (
    id INT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

-- SELECT * FROM departments;