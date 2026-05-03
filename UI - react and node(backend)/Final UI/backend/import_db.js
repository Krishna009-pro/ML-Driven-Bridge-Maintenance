import mysql from 'mysql2';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect without specifying a database yet
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true // Essential for running full SQL dumps
});

db.connect(err => {
    if (err) {
        console.error('❌ Connection Error:', err);
        process.exit(1);
    }
    console.log('✅ Connected to MySQL Server');

    // 1. Create the database
    db.query('CREATE DATABASE IF NOT EXISTS bridge_maintainance', (err) => {
        if (err) {
            console.error('❌ Failed to create database:', err);
            db.end();
            return;
        }
        console.log('✅ Database "bridge_maintainance" created or already exists.');

        // 2. Select the database
        db.query('USE bridge_maintainance', (err) => {
            if (err) {
                console.error('❌ Failed to select database:', err);
                db.end();
                return;
            }

            // 3. Read the SQL dump file
            // Go up 3 levels to reach "Project Source Code", then go into "Database"
            const sqlFilePath = path.resolve(__dirname, '../../../Database/bridge_maintainance.sql');
            let sqlFile = '';
            try {
                sqlFile = fs.readFileSync(sqlFilePath, 'utf8');
            } catch (e) {
                console.error('❌ Could not find the SQL file at', sqlFilePath);
                db.end();
                return;
            }

            console.log('⏳ Importing database tables and data...');
            // 4. Execute the entire SQL dump
            db.query(sqlFile, (err) => {
                if (err) {
                    console.error('❌ Failed to import SQL data:', err);
                } else {
                    console.log('🎉 Successfully imported all data into "bridge_maintainance"!');
                }
                db.end();
            });
        });
    });
});
