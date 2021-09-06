use employees;

INSERT INTO department 
(name)
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
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);