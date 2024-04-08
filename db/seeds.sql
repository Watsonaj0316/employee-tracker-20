USE employee_tracker_db;

INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Sales');

INSERT INTO roles (title, salary, departments_id) VALUES ('Sales Lead', 80000, 4);
INSERT INTO roles (title, salary, departments_id) VALUES ('Salesperson', 60000, 4);
INSERT INTO roles (title, salary, departments_id) VALUES ('Lead Engineer', 120000, 1);
INSERT INTO roles (title, salary, departments_id) VALUES ('Account Manager', 75000, 2);
INSERT INTO roles (title, salary, departments_id) VALUES ('Accountant', 140000, 3);
INSERT INTO roles (title, salary, departments_id) VALUES ('Legal Team Lead', 200000, 3);
INSERT INTO roles (title, salary, departments_id) VALUES ('Lawyer', 180000, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('James', 'Brown', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Alyssa', 'Stephens', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Aretha', 'Franklin', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Jackson', 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Brooklyn', 'Nikole', 4, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Doja', 'Dlamini', 5, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Kendrick', 'Lamar', 5, 5);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Katt', 'Williams', 6, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Shakur', 'Stevenson', 7, 8);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jamal', 'Morton', 7, 8);
