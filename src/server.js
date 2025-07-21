// src/server.js
const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- JSON Server Setup ---
// IMPORTANT: Adjusted path for db.json since server.js is now in 'src'
const router = jsonServer.router(path.join(__dirname, '..', 'db.json')); // Go up one level
const jsonServerMiddlewares = jsonServer.defaults();

app.use('/goals', cors());
app.use('/goals', jsonServerMiddlewares);
app.use('/goals', router);

// --- Static File Serving (for React App) ---
// This is still correct: 'dist' is a sibling of 'src' in the project root
app.use(express.static(path.join(__dirname, '..', 'dist'))); // Go up one level to 'dist'

// For any other requests, serve the index.html from 'dist'.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html')); // Go up one level to 'dist'
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`JSON Server API available at /goals`);
  console.log(`React App served from /`);
});