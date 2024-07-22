CREATE DATABASE my_api_db;

USE my_api_db;

CREATE TABLE characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    method VARCHAR(10),
    endpoint VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);