use employees;

INSERT INTO department (name)
VALUES
    ('Executive'),
    ('Engineering'),
    ('Sales'),
    ('HR');

INSERT INTO role
    (title, salary, department_id) VALUES
    ('Sales', 20000, 1),
    ('Accountant', 4000, 1),
    ('Lead Engineer', 80000, 2),
    ('HR Rep', 90000, 2),
    ('Account Manager', 20000, 3),
    ('Janitor', 75000, 3),
    ('Assistant Manager', 10000, 4),
    ('General Manager', 24000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Julio', 'Sanchez', 1, NULL),
    ('Mike', 'Jones', 2, NULL),
    ('Jim', 'Rodriguez', 3, NULL),
    ('Justin', 'Pickles', 4, 3),
    ('Andrew', 'Colon', 5, 1,
    ('Jaime', 'Bue', 6, 2),
    ('Kathy', 'Liam', 7, 1),
    ('Tiff', 'Mendoza', 8, 2);