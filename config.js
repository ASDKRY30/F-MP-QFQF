const logger = require('./utils/logger.js');

// Load environment variables
require('dotenv').config();

const config = {
    token: process.env.DISCORD_BOT_TOKEN || '',
    clientId: process.env.CLIENT_ID || '',
    guildId: process.env.GUILD_ID || '', // Optional: for guild-specific commands
    prefix: process.env.PREFIX || '!',
    logLevel: process.env.LOG_LEVEL || 'info',
    
    // Super administrators (can use bot in any server)
    superAdmins: [
        process.env.BOT_OWNER_ID || '',
        // Add more super admin IDs here if needed
    ].filter(id => id !== ''),
    
    // Premium bot settings
    botName: '30K-BOT',
    botVersion: '3.0.0',
    developer: 'Kry',
    
    // Performance settings
    maxMemoryUsage: 512, // MB
    maxCacheSize: 1000,
    commandCooldown: 3, // seconds
    
    // Security settings
    ownerOnlyMode: true,
    antiRaidProtection: true,
    autoModeration: true,
    
    // Uptime settings
    keepAliveInterval: 25000, // 25 seconds
    healthCheckInterval: 60000, // 1 minute
    autoReconnectDelay: 5000, // 5 seconds
    
    // Feature flags
    features: {
        advancedModeration: true,
        ticketSystem: true,
        giveawaySystem: true,
        backupSystem: true,
        performanceMonitoring: true,
        securityAuditing: true,
        autoDelivery: true,
        welcomeSystem: true
    }
};

// Validate required configuration
if (!config.token) {
    logger.error('DISCORD_BOT_TOKEN environment variable is required!');
    logger.info('Please add your Discord bot token to the environment variables.');
    process.exit(1);
}

if (!config.clientId) {
    logger.warn('CLIENT_ID environment variable not set. Commands will be registered using the bot\'s user ID.');
}

// Validate token format
if (!config.token.match(/^[A-Za-z0-9._-]{24}\.[A-Za-z0-9._-]{6}\.[A-Za-z0-9._-]{27}$/)) {
    logger.warn('Warning: Token format does not match expected Discord bot token format.');
    logger.info('Make sure you are using the bot token from the "Bot" section, not the application secret.');
}

module.exports = config;
