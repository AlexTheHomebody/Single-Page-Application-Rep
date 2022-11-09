DROP TABLE IF EXISTS workers;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    depart_id serial PRIMARY KEY,
    name text NOT NULL
);

CREATE TABLE workers(
    worker_id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    depart_id integer NOT NULL REFERENCES departments ON DELETE CASCADE
);


INSERT INTO departments (name) 
VALUES ('Sales'),
('HR'),
('Managment'),
('Customer service'),
('Accounting');


INSERT INTO workers (first_name, last_name, depart_id) 
VALUES ('John', 'Smith', 1),
('Jane', 'Smith', 2),
('Alex', 'Burris', 3),
('Matt', 'Hopps', 4),
('Trish', 'Zales', 5),
('Hunter', 'Jackson', 4),
('David', 'Mcguire', 1),
('Aysha', 'Redmond', 5),
('Jamie', 'Cortes', 1),
('Joyce', 'Carver', 5),
('Kuba', 'Berger', 1),
('Sandra', 'Couch', 1),
('Arthur', 'Morgan', 2),
('Dougie', 'Keller', 1),
('Malak', 'Mercer', 4);