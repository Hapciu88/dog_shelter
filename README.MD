
# DogShelter Project

## Description

A Node.js project using Sequelize to manage a `dogshelter` database in MySQL. This project demonstrates how to set up a database, define models, and run the application in a Dockerized environment.

---

## Prerequisites

Ensure the following are installed on your machine:
- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **Docker** (for running MySQL)

---

## Setup Instructions

Follow these steps to initialize the project:

### 1. Clone the Repository
Clone the project repository to your local machine:

### 2. Install Dependencies
Install the required Node.js packages:
```bash
npm install
```

### 3. Setup the MySQL Database
#### a. Pull the MySQL Docker Image
Pull the official MySQL Docker image:
```bash
docker pull mysql:latest
```


#### b. Run the Database Setup Script
Run the `setup-database.sh` script to create the database and user:
```bash
bash setup-database.sh
```

---

### 4. Start the Application
Run the Node.js application:
```bash
npm start
```

The application will start on [http://localhost:8000](http://localhost:8000).

---

## Additional Notes

- The `setup-database.sh` script uses the SQL commands in `setup-database.sql` to create the `dogshelter` database and a `dogshelteruser` with the necessary privileges.
- Ensure the `config/database.js` file contains the correct database credentials:
  ```javascript
  const sequelize = new Sequelize('dogshelter', 'dogshelteruser', '18h23endiashbdhbzxc', {
      host: 'localhost',
      dialect: 'mysql',
  });
  ```

---

## Troubleshooting

- **Database Connection Error**: Verify that the MySQL container is running and the credentials in `config/database.js` match the ones in `setup-database.sql`.
- **Port Conflicts**: Ensure no other service is using port `8000` or `3306` on your machine.

---

