CREATE DATABASE crm;

 CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  user_type VARCHAR(50) NOT NULL
);

CREATE TABLE leads(
  lead_id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  company VARCHAR(50) NOT NULL,
  job_title VARCHAR(50) NOT NULL,
  lead_status VARCHAR(50) NOT NULL
);

CREATE TABLE notes(
  note_id SERIAL PRIMARY KEY,
  note_title VARCHAR(50) NOT NULL,
  note_body VARCHAR(255) NOT NULL,
  lead_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  created_by INT NOT NULL,
  FOREIGN KEY (lead_id) REFERENCES leads(lead_id)
);