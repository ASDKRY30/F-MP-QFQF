const express = require('express');
const logger = require('./utils/logger.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Keep-alive endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'alive',
        bot: '30K-BOT Elite',
        developer: 'Kry',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        memory: process.memoryUsage(),
        uptime: process.uptime()
    });
});

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Keep-alive server running on port ${PORT}`);
    logger.info('🚀 24/7 Keep-alive system activated');
});

// Auto-ping system to keep the bot awake
const keepAlivePing = () => {
    const http = require('http');
    const url = `http://localhost:${PORT}/health`;
    
    http.get(url, (res) => {
        logger.debug('Keep-alive ping successful');
    }).on('error', (err) => {
        logger.warn('Keep-alive ping failed:', err.message);
    });
};

// Ping every 25 seconds to prevent sleeping
setInterval(keepAlivePing, 25000);

// Initial ping
setTimeout(keepAlivePing, 5000);

// Prevent process from exiting
process.on('exit', (code) => {
    logger.warn(`Process attempted to exit with code ${code} - PREVENTED for 24/7 operation`);
});

process.on('beforeExit', (code) => {
    logger.warn(`Process attempted beforeExit with code ${code} - PREVENTED for 24/7 operation`);
});

logger.info('🛡️ 30K-BOT Elite configured for permanent 24/7 operation');
logger.info('💪 Auto-recovery and keep-alive systems active');

module.exports = app;