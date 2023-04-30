-- DATABASE SETUP
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(255),
  password VARCHAR(255),
  company_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company_id UUID REFERENCES companies(id),
  created_at TIMESTAMP DEFAULT NOW(),
  lead_owner UUID NOT NULL REFERENCES users(id)
);

-- Create the lead_notes table
CREATE TABLE lead_notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  note_title VARCHAR(255) NOT NULL,
  note_body TEXT NOT NULL,
  lead_id UUID NOT NULL REFERENCES leads(id),
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(id)
);

-- Create the companies table
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR(255) NOT NULL,
  address TEXT,
  phone VARCHAR(20),
  website VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create the company_admins table
CREATE TABLE company_admins (
  company_id UUID REFERENCES companies(id),
  admin_id UUID REFERENCES users(id),
  PRIMARY KEY (company_id, admin_id)
);

-- Create the conversations table
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_1 UUID REFERENCES users(id),
  user_2 UUID REFERENCES users(id)
);

-- Create the messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_body TEXT NOT NULL,
  sender UUID NOT NULL REFERENCES users(id),
  recipient UUID NOT NULL REFERENCES users(id),
  conversation_id UUID NOT NULL REFERENCES conversations(id)
);

-- Create the events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_name VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  event_description TEXT NOT NULL,
  event_owner UUID NOT NULL REFERENCES users(id),
  event_participants UUID[] NULL,
  lead UUID REFERENCES leads(id) NULL
);

-- Create the event_participants table
CREATE TABLE event_participants (
  event_id UUID REFERENCES events(id),
  participant_id UUID REFERENCES users(id),
  PRIMARY KEY (event_id, participant_id)
);

-- Create the tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  task_name VARCHAR(255) NOT NULL,
  task_description TEXT NOT NULL,
  task_owner UUID NOT NULL REFERENCES users(id),
  task_due_date DATE NOT NULL,
  task_completed BOOLEAN NOT NULL DEFAULT FALSE,
  lead_id UUID REFERENCES leads(id)
);


INSERT INTO users (first_name, last_name, email, password, company_id, created_at, photo_url)
VALUES ('Jackson', 'Kalmbach', 'jacksonrkalmbach@gmail.com', 'demop@ss4321', 3, NOW(),'https://media.licdn.com/dms/image/D4E03AQFseatAMo8cnA/profile-displayphoto-shrink_800_800/0/1679333449150?e=1688601600&v=beta&t=y0-TZHgzkwR9PGhpb0XD1zP5qagfuVSywOxO6KD1FOY');