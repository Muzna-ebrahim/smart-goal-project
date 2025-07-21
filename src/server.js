// server.js
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use Render's assigned port or default to 3000

// --- JSON Server Setup ---
const router = jsonServer.router('db.json'); // Your database file
const jsonServerMiddlewares = jsonServer.defaults();

// Enable CORS for JSON server. Crucial for development/local testing.
// In production on Render, if served from the same domain, it might not be strictly needed,
// but it's good practice and harmless here.
app.use('/goals', cors()); // Apply CORS specifically to the /goals API route
app.use('/goals', jsonServerMiddlewares); // Apply json-server defaults (logger, static, etc.)
app.use('/goals', router); // Mount json-server at the /goals path

// --- Static File Serving (for React App) ---
// Serve static files from the 'dist' directory (where Vite builds your React app)
app.use(express.static(path.join(__dirname, 'dist')));

// For any other requests, serve the index.html from 'dist'.
// This is important for React Router (if you use it) and for refreshing pages.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`JSON Server API available at /goals`);
  console.log(`React App served from /`);
});