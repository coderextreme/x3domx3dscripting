var express = require('express');
var fs = require('fs');
var https = require('https');
var path = require('path'); // Add path module
var app = express();
var port = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static(__dirname));

// Define MIME types for common file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.xhtml': 'application/xhtml+xml',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.x3d': 'model/x3d+xml',
    '.wrl': 'model/vrml',
    '.vs': 'text/plain',  // or 'x-shader/x-vertex' if you prefer, but 'text/plain' is safer
    '.fs': 'text/plain',  // or 'x-shader/x-fragment' if you prefer, but 'text/plain' is safer
    // Add more MIME types as needed
};

// Basic Logging Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Simple request logging
    next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// HTTPS server setup
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(port, 'localhost', () => {
  console.log(`Server listening on port ${port}! Go to https://localhost:${port}/`);
});
