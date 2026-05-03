import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config(); // Load environment variables

const SECRET_KEY = "administrator";
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bridge_maintainance',
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('❌ MySQL Connection Error:', err);
    } else {
        console.log('✅ Connected to MySQL Database');
    }
});

// Middleware to check database connection before each request
app.use((req, res, next) => {
    if (!db || db.state === 'disconnected') {
        return res.status(500).json({ error: 'Database connection lost' });
    }
    next();
});

// Fetch all bridge data
app.get("/api/data", (req, res) => {
    const query = "SELECT * FROM bridge";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bridge data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// Fetch all Users data
app.get("/api/userdata", (req, res) => {
    const query = "SELECT * FROM `users`";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bridge data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});



// Fetch all Users data
app.get("/api/AssignedMaintenance", (req, res) => {
    const query = "SELECT * FROM `maintenance`";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bridge data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});



// Fetch bridge data by ID (Prevents SQL injection)
app.get("/api/BridgeData", (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Bridge ID is required" });

    const query = "SELECT * FROM bridge WHERE Id = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching bridge data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// Fetch recommendations with "remaining" status
app.get("/api/BridgeRecData", (req, res) => {
    const query = "SELECT `RecId`, `BridgeId`, `ScanDate`, `Remaining Lifespan`, `Durability`, `Status` FROM `recommendation` WHERE `Status` = 'remaining'";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recommendation data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

// Fetch maintenance history by Bridge ID (Prevents SQL injection)
app.get("/api/MaintenanceData", (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Bridge ID is required" });

    const query = "SELECT * FROM `maintenance_history` WHERE `Bridge_ID` = ?";
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching maintenance data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});

app.get("/api/BridgeRecommendation", (req, res) => {
    
    const query = "SELECT * FROM `recommendation`";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maintenance data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});



app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
  
    const query = 'SELECT * FROM users WHERE Name = ? AND Password = ?';
    db.query(query, [username, password], (err, result) => {
      if (err) {
        console.error('Query error:', err);
        return res.status(500).json({ success: false });
      }
  
      if (result.length > 0) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    });
  });





  app.get("/api/dashboardCount", (req, res) => {
    
    const query = "SELECT COUNT(*) FROM `bridge`;";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maintenance data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results[0]["COUNT(*)"]);
    });
});




app.get("/api/dashboardAttentionCount", (req, res) => {
    
    const query = "SELECT COUNT(*) FROM `recommendation`;";
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching maintenance data:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results[0]["COUNT(*)"]);
    });
});
  




// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Backend server running on port ${PORT}`);
});


app.delete('/api/userdata/:id', (req, res) => {
    const id = req.params.id;
    // DELETE SQL query for MySQL
    const query = 'DELETE FROM users WHERE ID = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).send('Server error');
      }
      res.send({ message: 'User deleted successfully' });
    });
  });
  

  app.put('/api/updateMaintenance/:id', (req, res) => {
    const bridgeId = req.params.id;
    const newStatus = 'completed'; // Or you can get this from req.body if it's dynamic
    
    // UPDATE SQL query for MySQL
    const query = 'UPDATE `maintenance` SET `status` = ? WHERE `maintenance id` = ?';

    db.query(query, [newStatus, bridgeId], (err, result) => {
      if (err) {
        console.error("Error updating maintenance status:", err);
        return res.status(500).send('Server error');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Bridge not found');
      }

      res.send({ message: 'Maintenance status updated successfully' });
    });
});
