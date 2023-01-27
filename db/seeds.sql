INSERT INTO department (name)
VALUES ('IT'),
('Small-Packaging'),
('Large-Production');

INSERT INTO roles (title, salary, department_id)
VALUES ("Manager", 100.03,2),
("Manager", 100000.03,1),
("Manager", 200.03,3),
("FrontEnd Nerd",87000.03,1),
("Little Packer",300.03,2),
("Big Packer",600.03,3),
("BackEnd Nerd",77000.03,1),
("Little Shipper",305.03,2),
("Big Shipper",605.03,3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sean","Mcguire",4,null),
("Garret","Winter",7,null),
("Joshua","Hamann",6,null),
("Charlie","Werness",2, null),
("Taylor","Sample",5,null),
("Chris","",1, null),
("Jessica","",3, null),
("Skylar","Fynboh",8, null),
("William","Burnton",9, null);
