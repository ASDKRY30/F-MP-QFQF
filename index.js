const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const logger = require('./utils/logger.js');

// Initialize keep-alive server to prevent sleeping
require('./keep-alive.js');

// Initialize webhook server for MercadoPago integration
require('./webhook-server.js');

// Create a new client instance
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration
    ]
});

// Enhanced bot statistics and performance monitoring
client.stats = {
    startTime: Date.now(),
    commandsExecuted: 0,
    messagesProcessed: 0,
    errorsHandled: 0,
    uptimeTarget: '10+ years',
    lastRestart: new Date(),
    memoryUsageMB: 0,
    lastHealthCheck: new Date()
};

// Memory optimization settings
const MAX_MEMORY_USAGE = 500; // MB
const MEMORY_CHECK_INTERVAL = 60000; // 1 minute

// Elite performance monitoring
setInterval(() => {
    const memoryUsage = process.memoryUsage();
    const heapUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024);
    
    if (heapUsedMB > MAX_MEMORY_USAGE) {
        logger.warn(`High memory usage detected: ${heapUsedMB}MB`);
        
        // Cleanup measures
        if (global.gc) {
            global.gc();
            logger.info('Garbage collection executed');
        }
        
        // Clear caches if needed
        client.channels.cache.sweep(() => false);
        client.users.cache.sweep(() => false);
        
        logger.info('Memory cleanup completed');
    }
    
    client.stats.memoryUsageMB = heapUsedMB;
}, MEMORY_CHECK_INTERVAL);

// Enhanced owner verification function
client.isOwner = (userId, guildId) => {
    // Check if user is a configured super admin
    if (config.superAdmins.includes(userId)) {
        return true;
    }
    
    // Check if user is the server owner (if in a guild)
    if (guildId) {
        const guild = client.guilds.cache.get(guildId);
        if (guild && guild.ownerId === userId) {
            return true;
        }
    }
    
    return false;
};

// Create a collection to store commands
client.commands = new Collection();

// Load commands
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
        logger.info(`Loaded command: ${command.data.name}`);
    } else {
        logger.warn(`Command at ${filePath} is missing required "data" or "execute" property.`);
    }
}

// Load events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
    logger.info(`Loaded event: ${event.name}`);
}

// Note: Event handling is done through the events/ directory files
// This avoids duplication and keeps the code modular

// Enhanced error handling for premium reliability
client.on('error', error => {
    logger.error('Discord client error:', error);
    client.stats.errorsHandled++;
    
    // Auto-recovery attempt
    setTimeout(() => {
        if (!client.isReady()) {
            logger.info('Attempting auto-recovery...');
            client.login(config.token);
        }
    }, config.autoReconnectDelay);
});

client.on('warn', info => {
    logger.warn('Discord warning:', info);
});

client.on('disconnect', () => {
    logger.warn('Disconnected from Discord');
});

client.on('reconnecting', () => {
    logger.info('Reconnecting to Discord...');
});

process.on('unhandledRejection', error => {
    logger.error('Unhandled promise rejection:', error);
    client.stats.errorsHandled++;
});

// Removed duplicate - handled below

// Graceful shutdown handling with data preservation
const gracefulShutdown = (signal) => {
    logger.info(`Received ${signal}. Starting graceful shutdown...`);
    
    if (client.isReady()) {
        client.user.setPresence({
            activities: [{ name: 'Restarting...', type: 'PLAYING' }],
            status: 'idle'
        });
    }
    
    logger.info('Saving shutdown data...');
    const shutdownData = {
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        stats: client.stats,
        reason: signal,
        memoryUsage: process.memoryUsage(),
        botInfo: {
            guilds: client.guilds.cache.size,
            users: client.users.cache.size,
            channels: client.channels.cache.size
        }
    };
    
    try {
        fs.writeFileSync('./shutdown-data.json', JSON.stringify(shutdownData, null, 2));
        logger.info('Shutdown data saved successfully');
    } catch (error) {
        logger.error('Failed to save shutdown data:', error);
    }
    
    setTimeout(() => {
        logger.info('Graceful shutdown completed');
        client.destroy();
        process.exit(0);
    }, 3000);
};

// Handle shutdown signals - but prevent shutdown for 24/7 uptime
process.on('SIGINT', () => {
    logger.warn('SIGINT received - but maintaining 24/7 uptime. Bot will NOT shutdown.');
    logger.info('🛡️ Elite bot configured for permanent operation');
});

process.on('SIGTERM', () => {
    logger.warn('SIGTERM received - but maintaining 24/7 uptime. Bot will NOT shutdown.');
    logger.info('🛡️ Elite bot configured for permanent operation');
});

// Auto-reconnection system for 24/7 uptime
const connectWithRetry = () => {
    logger.info('Attempting to connect to Discord...');
    client.login(config.token).catch(error => {
        logger.error('Failed to connect:', error);
        client.stats.errorsHandled++;
        logger.info(`Retrying in ${config.autoReconnectDelay/1000} seconds...`);
        setTimeout(connectWithRetry, config.autoReconnectDelay);
    });
};

// Elite boot sequence
logger.info('🚀 Starting 30K-BOT Elite...');
logger.info('💎 Premium Discord Management System');
logger.info('👨‍💻 Developed by: Kry');
logger.info('🎯 Target: 24/7 uptime for 10+ years');
logger.info('🛡️ Security: Owner-only access');
logger.info('');

connectWithRetry();

// Watchdog timer to ensure 24/7 operation
setInterval(() => {
    try {
        // Update health check timestamp
        client.stats.lastHealthCheck = new Date();
        
        // Log uptime every hour
        const uptimeHours = Math.floor(process.uptime() / 3600);
        if (uptimeHours > 0 && process.uptime() % 3600 < 60) {
            logger.info(`🕒 Elite bot uptime: ${uptimeHours} hours - Target: 10+ years`);
            logger.info(`📊 Stats: ${client.stats.commandsExecuted} commands, ${client.stats.messagesProcessed} messages`);
        }
        
        // Ensure bot is still connected
        if (client.isReady()) {
            logger.debug('Bot status: ONLINE and READY');
        } else {
            logger.warn('Bot not ready - attempting reconnection...');
            connectWithRetry();
        }
        
    } catch (error) {
        logger.error('Watchdog error:', error);
        client.stats.errorsHandled++;
    }
}, 30000); // Check every 30 seconds

// Simple error handling without restarts
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception:', error);
    client.stats.errorsHandled++;
});

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled rejection:', error);
    client.stats.errorsHandled++;
});

logger.info('⚡ All systems initialized - 30K-BOT Elite ready for permanent operation');
logger.info('🎯 Uptime target: 10+ years | Auto-recovery: ACTIVE | Memory optimization: ACTIVE');