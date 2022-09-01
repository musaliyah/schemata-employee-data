USE employee_DB;
INSERT INTO department (names)
VALUES 
("Sales"), 
("Engineering"), 
("Finance"), 
("Legal");

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


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Walter", "White", 1, NULL),
("Gus", "Fring", 2, 1),
("Saul", "Goodman", 3, 2),
("Jesse", "Pinkman", 4, 3),
("Skyler", "White", 5, 4),
("Mike", "Ehrmantraut", 6, 5);


