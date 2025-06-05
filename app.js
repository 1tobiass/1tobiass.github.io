const express = require('express');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);
const PORT = 3000;

// Serve static files from current directory
app.use(express.static(__dirname));

// Route for the root path to serve index.html
app.get('/', (req, res) => {
    console.log('Root route accessed');
    const filePath = path.join(__dirname, 'index.html');
    console.log('Serving file from:', filePath);
    res.sendFile(filePath);
});

// Add error handling
app.use((req, res, next) => {
    console.log(`404 - Route not found: ${req.method} ${req.url}`);
    res.status(404).send('Not Found');
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Serving files from: ${__dirname}`);
});