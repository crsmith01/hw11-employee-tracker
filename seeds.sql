-- Use database entiteld employeeTrackerDB in mysql
USE employeeTrackerDB

INSERT INTO department (id, department_name)
VALUES (1,'Production'),
    (2, 'Research and Development'),
    (3, 'Marketing'),
    (4, 'Human Resources'),
    (5, 'Accounting'),
    (6, 'Legal');

INSERT INTO role (id, title, salary, department_id)
VALUES (1,'Head of Marketing',110000,3),
    (2,'Salespearson',40000,3),
    (3,'Marketing Intern',25000,3),
    (4,'Accounting Manager',75000,5),
    (5,'Accounting Assistant',40000,5),
    (6,'Lead Engineer',100000,2),
    (7,'Jr. Engineer',65000,2),
    (8,'Engineering Intern',40000,2),
    (9,'Lawyer',125000,6),
    (10,'Legal Assistant',45000,6),
    (11,'Head of Legal Team',138000,6),
    (12,'Human Resources Manager',80000,4),
    (13,'Human Resources Assistant',45000,4),
    (14,'Production Manager',70000,1),
    (15,'Production Assistant',40000,1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,'Alexa','Rose',15,15),
    (2,'Jessica','Day',13,20),
    (3,'David','Rose',5,6),
    (4,'Rosa','Dia',7,21),
    (5,'Elizabeth','Bennet',7,21),
    (6,'William','Darcy',4,null),
    (7,'Nick','Miller',9,16),
    (8,'Winston','Bishop',2,22),
    (9,'Cece','Parikh',3,22),
    (10,'Peter','Parker',8,21),
    (11,'John','Watson',10,16),
    (12,'Atticus','Finch',9,16),
    (13,'Sally','Bowles',2,22),
    (14,'Samwise','Gamgee',15,15),
    (15,'James','Bond',14,null),
    (16,'Annalise','Keating',11,null),
    (17,'Gwen','Stacy',7,21),
    (18,'Hermione','Granger',13,20),
    (19,'Jessica','Jones',9,16),
    (20,'Steve','Rogers',12,null),
    (21,'Qui-Gon','Jinn',6,null),
    (22,'Peggy','Carter',1,null),
    (23,'Bucky','Barnes',10,16),
    (24,'Sam','Wilson',13,20),
    (25,'Roger','Ackwroyd',13,20),
    (26,'Agatha','Christie',9,16),
    (27,'Winston','Schmidt',2,22);