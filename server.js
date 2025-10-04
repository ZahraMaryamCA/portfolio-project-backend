// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./server/config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const contactRoutes = require('./server/routes/contact.routes');
const userRoutes = require('./server/routes/user.routes');

// Welcome route - displays message in browser
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Portfolio API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          text-align: center;
          background: white;
          padding: 50px;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          max-width: 600px;
        }
        h1 {
          color: #333;
          margin-bottom: 10px;
        }
        p {
          color: #666;
          font-size: 18px;
        }
        .status {
          color: #28a745;
          font-weight: bold;
        }
        .endpoints {
          margin-top: 30px;
          text-align: left;
          background: #f8f9fa;
          padding: 20px;
          border-radius: 5px;
        }
        .endpoints h3 {
          color: #333;
          margin-top: 0;
        }
        .endpoints ul {
          list-style: none;
          padding: 0;
        }
        .endpoints li {
          padding: 5px 0;
          color: #555;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Assignment-02 Portfolio API</h1>
        <p class="status">Server is running successfully!</p>
        <p>Port: ${process.env.PORT || 3000}</p>
        <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
        
        <div class="endpoints">
          <h3>API Endpoints:</h3>
          <ul>
            <li><strong>Contacts:</strong> /api/contacts</li>
            <li><strong>Users:</strong> /api/users</li>
          </ul>
        </div>
      </div>
    </body>
    </html>
  `);
});

// API Routes
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Define PORT
const PORT = process.env.PORT || 3000;

// Start server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});