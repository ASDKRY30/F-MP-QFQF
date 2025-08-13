const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.js');
const logger = require('./utils/logger.js');

// Initialize keep-alive server
require('./keep-alive.js');
require('./webhook-server.js');

// Create client
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration
    ]
});

// Bot statistics
client.stats = {
    startTime: Date.now(),
    commandsExecuted: 0,
    messagesProcessed: 0,
    errorsHandled: 0
};

// Owner verification
client.isOwner = (userId, guildId) => {
    if (config.superAdmins.includes(userId)) return true;
    if (guildId) {
        const guild = client.guilds.cache.get(guildId);
        if (guild && guild.ownerId === userId) return true;
    }
    return false;
};

// Commands collection
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

// Simple error handling
client.on('error', error => {
    logger.error('Discord client error:', error);
    client.stats.errorsHandled++;
});

process.on('unhandledRejection', error => {
    logger.error('Unhandled promise rejection:', error);
    client.stats.errorsHandled++;
});

// Prevent crashes but don't restart
process.on('uncaughtException', error => {
    logger.error('Uncaught exception:', error);
    client.stats.errorsHandled++;
});

// Startup
logger.info('🚀 Starting 30K-BOT Elite...');
logger.info('💎 Premium Discord Management System');
logger.info('👨‍💻 Developed by: Kry');
logger.info('🎯 Target: 24/7 uptime');
logger.info('🛡️ Security: Owner-only access');

// Connect to Discord
client.login(config.token).catch(error => {
    logger.error('Failed to connect:', error);
});

logger.info('⚡ Bot initialized - 30K-BOT Elite ready');