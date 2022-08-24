INSERT INTO department (name)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

SELECT * FROM DEPARTMENT; 

INSERT INTO roles (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 1),
    ("Salesperson", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000,2),
    ("Account Manager", 160000, 3),
    ("Accountatnt", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

SELECT * FROM roles;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Walter", "White", 2, NULL),
("Gus", "Fring", 3, NULL),
("Saul", "Goodman", 4, NULL),
("Jesse", "Pinkman", 2, 1),
("Skyler", "White", 1, 4),
("Mike", "Ehrmantraut", 3, 2);

SELECT * FROM employee;

