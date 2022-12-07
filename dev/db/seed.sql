INSERT INTO departments (name, id)
VALUES ("Sales", 1),
       ("Engineering", 2),
       ("Sales", 3),
       ("Legal", 4);
       
INSERT INTO roles (title, salary, department)
VALUES ("Saleslead",100000, 1),
       ("Sales Person", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3), 
       ("Accountant",125000, 3 ),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Byron", "Furguson", 3, NULL),
       ("Graham", "Chapman", 4, 1),
       ("John", "Cleese", 1, NULL),
       ("Terry", "Gilliam", 2, 1),
       ("Terry", "Jones", 5, NULL),
       ("Eric", "Idle", 6, 1),
       ("Michael", "Palin", 7, NULL),
       ("Terry", "Jones", 8, 1);