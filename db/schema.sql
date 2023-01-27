DROP DATABASE IF EXISTS dept_db;

CREATE DATABASE `dept_db`; 

USE dept_db;

CREATE TABLE department (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);
CREATE TABLE employee (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL,
    manager_id INT DEFAULT null,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

