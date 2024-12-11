#!/bin/bash

# Define MySQL container name and credentials
MYSQL_CONTAINER_NAME="mysql-container"
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASSWORD="root2027"

# Path to the SQL script
SQL_SCRIPT_PATH="./setup-database.sql"

# Check if the MySQL container is already running
if [ ! "$(docker ps -q -f name=$MYSQL_CONTAINER_NAME)" ]; then
    echo "MySQL container not found. Creating and starting the container..."

    # Pull MySQL Docker image if not already pulled
    docker pull mysql:latest

    # Create and run the MySQL container
    docker run --name $MYSQL_CONTAINER_NAME \
        -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD \
        -d -p 3306:3306 mysql:latest

    echo "Waiting for MySQL to initialize..."
    sleep 30 # Give the MySQL server time to initialize
else
    echo "MySQL container is already running."
fi

# Run the SQL script inside the Docker container
if [ -f $SQL_SCRIPT_PATH ]; then
    echo "Executing SQL script..."
    docker exec -i $MYSQL_CONTAINER_NAME mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASSWORD < $SQL_SCRIPT_PATH
    echo "Database and user setup complete."
else
    echo "SQL script not found at $SQL_SCRIPT_PATH."
fi
