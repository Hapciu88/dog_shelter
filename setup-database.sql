-- Create the database
CREATE DATABASE IF NOT EXISTS dogshelter;

-- Create the user with a strong password
CREATE USER IF NOT EXISTS 'dogshelteruser'@'%' IDENTIFIED BY '18h23endiashbdhbzxc';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON dogshelter.* TO 'dogshelteruser'@'%';

-- Apply the changes
FLUSH PRIVILEGES;
