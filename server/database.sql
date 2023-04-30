CREATE DATABASE crm;

 CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  user_type VARCHAR(50) NOT NULL
);

CREATE TABLE events(
  event_id SERIAL PRIMARY KEY,
  event_name VARCHAR(50) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_description VARCHAR(255) NOT NULL,
  event_owner INT NOT NULL
);

CREATE TABLE messages(
  message_id SERIAL PRIMARY KEY,
  message_body VARCHAR(255) NOT NULL,
  message_sender INT NOT NULL,
  message_recipient INT NOT NULL
);

CREATE TABLE leads(
  lead_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(50) NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  lead_status VARCHAR(50) NOT NULL,
  lead_owner INT NOT NULL
);

CREATE TABLE notes(
  note_id SERIAL PRIMARY KEY,
  note_title VARCHAR(50) NOT NULL,
  note_body VARCHAR(255) NOT NULL,
  lead_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INT NOT NULL
);

CREATE TABLE employees(
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  department VARCHAR(50) NOT NULL,
  profile_pic VARCHAR(255) NOT NULL
);

INSERT INTO employees(
  first_name,
  last_name,
  email,
  phone,
  job_title,
  department,
  profile_pic
)
VALUES
 ('Mike', 'Thomas', 'mike.thomas@example.com', '6378778900', 'Account Executive', 'Sales', 'https://www.neilsonreeves.co.uk/wp-content/uploads/corporate-headshot-neutral-grey-bg.jpg');


INSERT INTO leads (first_name, last_name, email, phone, company, job_title, lead_status, lead_owner)
VALUES 
('Erin', 'Schumaker', 'eschumaker@example.com', '6768893456', 'XYZ Enterprise', 'Project Lead', 2);

INSERT INTO messages (message_body, message_sender, message_recipient)
VALUES 
("Good Morning, How was your weekend?", 1, 2);
