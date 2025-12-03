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


app.get('/angelina', (req, res) => {
    // This serves the main index file for any unknown route, 
    // allowing the client-side router to handle the path (like /angelina)
    const filePath = path.join(__dirname, '/a/index.html');
    res.sendFile(filePath);
});

// Route for /lstock to serve lstock/index.html (case-insensitive)
app.get(/^\/lstock$/i, (req, res) => {
    console.log('lstock route accessed');
    const filePath = path.join(__dirname, 'lstock', 'index.html');
    console.log('Serving file from:', filePath);
    res.sendFile(filePath);
});


// Quietly handle Chrome DevTools probe to avoid error logs
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
    // Return 204 No Content so clients stop treating this as an error
    res.status(204).send();
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