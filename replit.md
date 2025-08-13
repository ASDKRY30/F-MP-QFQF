# Discord Bot - 30K-BOT Complete Discord Management System

## Overview

This is a premium-grade Discord bot built with Discord.js v14 designed as an **Elite Discord Management System** exclusively for server owners. The bot features advanced architecture with 24/7 continuous operation, auto-recovery systems, real-time performance monitoring, and enterprise-level security protocols. ALL commands are restricted to server owner-only access for maximum security. The bot includes specialized features like enhanced presence rotation, comprehensive logging systems, memory optimization, graceful error handling, MercadoPago payment integration, auto-delivery systems, webhook processing, web dashboard monitoring, keep-alive systems, and multi-layer authentication. The system maintains "developed by: Kry" branding throughout all interactions and includes the exclusive !helpk command for owner command reference. Built for maximum uptime (10+ years) with auto-reconnection, self-healing architecture, and Reserved VM deployment compatibility.

**Recent Migration (August 2025)**: Successfully integrated complete BotAssist system with advanced MercadoPago payment processing, auto-delivery functionality, and enhanced security protocols. The bot now includes dual-server architecture (Discord bot + webhook server) for handling payment notifications and product delivery automation.

## User Preferences

Preferred communication style: Simple, everyday language.
Owner-Only Access: All commands restricted to server owners only for maximum security.
Bot Description: Must include "developed by: Kry" in all descriptions and embeds.
Elite Focus: Bot designed as premium Discord management system for server owners.
Security Protocol: Multi-layer authentication with complete access control.
Command Access: !helpk command exclusive for owners to view all available commands.
24/7 Operation: Designed for continuous 10+ year uptime with auto-recovery systems.

## System Architecture

### Bot Framework
- **Discord.js v14**: Modern Discord API wrapper with full support for slash commands and latest Discord features
- **Node.js Runtime**: Server-side JavaScript execution environment
- **Slash Commands Primary**: Modern Discord interaction system with fallback prefix commands for emergency use

### Command System
- **Modular Command Loading**: Dynamic command registration from `/commands` directory with validation
- **Permission-Based Access**: Role and permission checking for moderation commands
- **Slash Command Builder**: Structured command definition with options, descriptions, and permission requirements
- **Error Handling**: Comprehensive error catching with user-friendly error messages

### Event System
- **Event-Driven Architecture**: Separate event handlers in `/events` directory for different Discord events
- **Interaction Handling**: Processing slash command interactions with logging and error management
- **Message Processing**: Fallback prefix command support and help system
- **Ready State Management**: Bot initialization with presence setting and periodic updates

### Configuration Management
- **Environment Variables**: Secure token and configuration management using dotenv
- **Validation System**: Required configuration checking with graceful error handling
- **Flexible Deployment**: Support for both guild-specific and global command deployment

### Utilities and Helpers
- **Custom Logger**: Color-coded console logging with configurable log levels
- **Permission Utilities**: Helper functions for role hierarchy and permission checking
- **Security Features**: Self-action prevention and owner protection in moderation commands

### Moderation Features
- **Kick/Ban Commands**: Full moderation capabilities with reason logging and message deletion options
- **Mute/Unmute System**: Temporary timeouts with automatic expiration and DM notifications
- **Message Management**: Bulk message deletion with user-specific filtering
- **Anti-Raid Protection**: Automatic detection and prevention of raid attacks with configurable thresholds
- **Permission Hierarchy**: Proper role checking to prevent privilege escalation
- **Audit Trail**: Comprehensive logging of all moderation actions

### E-Commerce & Auto-Delivery System
- **MercadoPago Integration**: Full integration with MercadoPago payment processor for automated sales
- **Product Management**: Create, configure, and manage digital products for automatic delivery
- **Auto-Delivery System**: Automatic product delivery upon payment confirmation via webhooks
- **Sales Analytics**: Comprehensive sales tracking, revenue monitoring, and customer analytics
- **Payment Verification**: Secure payment verification system with webhook authentication
- **Multi-Product Support**: Support for multiple digital products with individual pricing and descriptions
- **Real-Time Notifications**: Instant notifications for sales, payments, and delivery confirmations
- **Revenue Dashboard**: Web-based dashboard for monitoring sales performance and statistics
- **Customer Management**: Track customer purchases, delivery history, and support interactions

### Administration Features  
- **Role Management**: Create, assign, and remove roles with permission validation
- **Welcome System**: Customizable welcome messages with beautiful embeds and auto-configuration
- **Server Configuration**: Anti-raid settings, welcome channel setup, and moderation tools

### Utility Commands
- **Server Information**: Detailed server statistics and metadata display
- **User Information**: User profile data with server-specific details like join date and roles
- **Avatar Display**: High-quality avatar viewing with multiple format downloads
- **Weather Information**: Real-time weather data for any city (requires API key)
- **Bot Status**: Ping and latency monitoring commands

### Entertainment Features
- **Interactive Polls**: Multi-option polls with automatic result calculation and voting
- **Games**: 8-ball magic responses, coin flips, dice rolling with multiple dice support
- **Giveaway System**: Fully automated giveaways with winner selection and notifications
- **Custom Embeds**: Create beautiful embeds with customizable colors, images, and content

### Advanced Ticket System
- **4 Business Categories**: Buy (purchases), Support (technical), Partner (collaborations), HWID (licensing)
- **Automatic Channel Creation**: Dynamic ticket channels with proper permissions
- **Category Management**: Organized ticket system with role-based access
- **Ticket Controls**: Add/remove users, close tickets, comprehensive logging

### Advanced Giveaway System  
- **Pro Giveaway Commands**: Create, edit, end, list, and reroll giveaways
- **Advanced Configuration**: Duration, winner count, role requirements, level restrictions
- **Reroll Functionality**: Multiple reroll capabilities with winner selection
- **Persistent Storage**: Giveaway data saved across bot restarts
- **Auto-Notifications**: Winner announcements and DM notifications

### Advanced Moderation Tools
- **Mass Ban System**: Ban multiple users by ID with comprehensive logging
- **Server Lockdown**: Complete server-wide channel locking/unlocking
- **Channel Nuking**: Bulk message deletion with configurable limits  
- **User Purge**: Delete all messages from specific users within timeframes
- **Slowmode Control**: Configurable rate limiting per channel
- **Comprehensive Logging**: All actions logged with user details and timestamps

### CEO Security System
- **Role-Based Access**: All commands restricted to CEO role or specific user
- **Permission Hierarchy**: Multiple CEO identification methods (role, owner, specific ID)
- **Exclusive Commands**: !helpk command for CEO-only command reference
- **Security Logging**: All command usage tracked and logged

### Always-Online System
- **24/7 Uptime**: Keep-alive server preventing bot sleep with integrated webhook server
- **Automatic Restarts**: Self-recovery system for handling crashes and errors
- **Status Monitoring**: Web interface showing bot status, uptime, server statistics, and payment analytics
- **Health Checks**: Periodic ping system maintaining constant connectivity
- **Webhook Server**: Integrated Express.js server for handling MercadoPago webhooks and API endpoints
- **Multi-Service Dashboard**: Combined dashboard for bot status, sales analytics, and system health
- **Branded Presence**: Bot status displays "Developed by: Kry" continuously

## External Dependencies

### Core Dependencies
- **discord.js (v14.21.0)**: Primary Discord API interaction library
- **dotenv (v17.2.1)**: Environment variable management for secure configuration
- **express (latest)**: Web server framework for webhook handling and API endpoints
- **crypto (built-in)**: Cryptographic functions for payment verification and security
- **fs (built-in)**: File system operations for data persistence and product management

### Discord API Integration
- **REST API**: Direct Discord REST API communication for command deployment
- **Gateway WebSocket**: Real-time event handling and bot presence management
- **Permissions API**: Discord permission system integration for access control

### Runtime Requirements
- **Node.js (>=16.11.0)**: Required runtime environment as specified by Discord.js
- **Environment Variables**: DISCORD_TOKEN, CLIENT_ID, GUILD_ID (optional), PREFIX, LOG_LEVEL