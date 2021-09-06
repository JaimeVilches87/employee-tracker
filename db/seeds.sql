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
    ('Joe', 'Shmow', 1, NULL),
    ('Julio', 'Cachay', 2, NULL),
    ('Melissa', 'Suarez', 3, NULL),
    ('Ant', 'Colon', 4, 3),
    ('Billy', 'Moreno', 5, 2),
    ('Jupiter', 'Mendoza', 6, 5),
    ('Kathy', 'Sung', 7, 1),
    ('Tiff', 'Pickles', 8, 7);