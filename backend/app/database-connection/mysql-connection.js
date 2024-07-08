const mysql = require('mysql2');
const { Sequelize } = require('sequelize');
const Liquibase = require('liquibase').Liquibase;
const dotenv = require('dotenv');
const log = require('./logfile'); // Importing your logfile.js for logging

// Load environment variables from .env file
dotenv.config();

// Define Sequelize instance outside the function scope
const sequelize = new Sequelize(process.env.SCHEMA_NAME, process.env.MYSQL_USE_NAME, process.env.MYSQL_PWD, {
    host: 'localhost',
    dialect: 'mysql'
});

// Function to setup database and run Liquibase migrations
async function setupDatabaseAndMigrations() {
    try {
        // Create MySQL database connection
        const db = mysql.createConnection({
            host: 'localhost',
            user: process.env.MYSQL_USE_NAME,
            password: process.env.MYSQL_PWD,
        });

        // Connect to the database
        await new Promise((resolve, reject) => {
            db.connect((err) => {
                if (err) {
                    log.Error('Error connecting to the database', err); // Logging error
                    reject(err);
                } else {
                    require('../../app/liquibase/data/defaultAddUserMapping');
                    log.Info('Connected to the database'); // Logging info
                    resolve();
                }
            });
        });

        // Create the schema if it doesn't exist
        await new Promise((resolve, reject) => {
            db.query('CREATE SCHEMA IF NOT EXISTS `project_management_system`', (err, results) => {
                if (err) {
                    log.Error('Error creating schema', err); // Logging error
                    reject(err);
                } else {
                    log.Info('Schema created successfully:', results); // Logging info
                    resolve();
                }
            });
        });

        // Test the database connection for Sequelize
        await sequelize.authenticate();
        log.Info('Sequelize: Connection has been established successfully.');

        // Liquibase configuration
        const liquibaseConfig = {
            changeLogFile: 'app/liquibase/master.xml',
            url: 'jdbc:mysql://localhost:3306/project_management_system',
            username: process.env.MYSQL_USE_NAME,
            password: process.env.MYSQL_PWD,
            classpath: 'app/database-connection/mysql-connector-java-8.0.17.jar',
        };

        // Create a Liquibase instance
        const liquibase = new Liquibase(liquibaseConfig);

        // Check pending changesets
        const status = await liquibase.status();
        log.Info('Liquibase: Pending changesets:', status);

        // Update database with pending changesets
        await liquibase.update();
        log.Info('Liquibase: Update successful');

        // Close the database connection
        db.end();

        // Return true to indicate setup completed successfully
        return true;
    } catch (error) {
        log.Error('Error during setup', error); // Logging error
        console.error('Error:', error.message);
        console.error('Detailed error:', error);
        return false;
    }
}

// Execute setup function
setupDatabaseAndMigrations();

// Export the Sequelize instance for use in other modules
module.exports = { setupDatabaseAndMigrations, sequelize };
