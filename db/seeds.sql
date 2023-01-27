USE dept_id;

INSERT INTO department (name)
VALUES ('IT'),
('Small-Packaging'),
('Large-Production');

INSERT INTO role (title, salary, department_id)
VALUES ("Mangaer", 100.03,2),
("Mangaer", 100,000.03,1),
("Mangaer", 200.03,3),
("FrontEnd Nerd",87,000.03,1),
("Little Packer",300.03,2),
("Big Packer",600.03,3),
("BackEnd Nerd",77,000.03,1),
("Little Shipper",305.03,2),
("Big Shipper",605.03,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sean","Mcguire",4,2),
("Garret","Winter",7,2),
("Joshua","Hamann",6,3),
("Charlie","Werness",2, null),
("Taylor","Sample",5,1),
("Chris","",1, null),
("Jessica","",3, null),
("Skylar","Fynboh",8, 1),
("William","Burnton",9, 3);
