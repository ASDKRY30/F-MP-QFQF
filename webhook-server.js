const express = require('express');
const crypto = require('crypto');
const logger = require('./utils/logger.js');

const app = express();
const PORT = process.env.WEBHOOK_PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MercadoPago webhook endpoint
app.post('/webhook/mercadopago', (req, res) => {
    try {
        logger.info('MercadoPago webhook received:', req.body);
        
        // Process payment notification
        const paymentData = req.body;
        
        // Add your payment processing logic here
        // For now, just log the received data
        
        res.status(200).json({ status: 'received' });
    } catch (error) {
        logger.error('Error processing MercadoPago webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// General webhook endpoint
app.post('/webhook', (req, res) => {
    try {
        logger.info('General webhook received:', req.body);
        res.status(200).json({ status: 'received' });
    } catch (error) {
        logger.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Webhook status endpoint
app.get('/webhook/status', (req, res) => {
    res.json({
        status: 'active',
        server: 'webhook-server',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`Webhook server running on port ${PORT}`);
});

module.exports = app;