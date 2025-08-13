const http = require('http');
const logger = require('./utils/logger.js');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('30K-BOT Elite is alive!\nDeveloped by: Kry\nUptime: 24/7');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    logger.info(`Keep-alive server running on port ${PORT}`);
});

module.exports = server;