#!/usr/bin/env node
/**
 * Discord Welcome Bot - HEAVEN OF GOD
 * Auto-send welcome message when new members join
 */

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

// Config from environment variables
const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = process.env.DISCORD_GUILD_ID;
const WELCOME_CHANNEL_ID = process.env.DISCORD_WELCOME_CHANNEL_ID;
const WELCOME_GIF = process.env.DISCORD_WELCOME_GIF || 'https://raw.githubusercontent.com/sakjanonkk/discord-welcome-bot/master/assets/welcome.jpg';

// Validation
if (!BOT_TOKEN) {
  console.error('❌ DISCORD_BOT_TOKEN is required!');
  process.exit(1);
}
if (!GUILD_ID) {
  console.error('❌ DISCORD_GUILD_ID is required!');
  process.exit(1);
}
if (!WELCOME_CHANNEL_ID) {
  console.error('❌ DISCORD_WELCOME_CHANNEL_ID is required!');
  process.exit(1);
}

// Create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ]
});

// Bot ready event
client.once('ready', () => {
  console.log('✅ Welcome Bot is online!');
  console.log(`📊 Logged in as: ${client.user.tag}`);
  console.log(`🎮 Serving ${client.guilds.cache.size} server(s)`);
  console.log(`🔧 Guild ID: ${GUILD_ID}`);
  console.log(`📢 Welcome Channel: ${WELCOME_CHANNEL_ID}`);
});

// Member join event
client.on('guildMemberAdd', async (member) => {
  // Check if it's our server
  if (member.guild.id !== GUILD_ID) {
    console.log(`⏭️ Ignoring member join from different server: ${member.guild.name}`);
    return;
  }
  
  console.log(`👋 New member joined: ${member.user.tag}`);
  
  try {
    // Get welcome channel
    const channel = await member.guild.channels.fetch(WELCOME_CHANNEL_ID);
    if (!channel) {
      console.error('❌ Welcome channel not found!');
      return;
    }
    
    // Get member count
    const memberCount = member.guild.memberCount;
    
    // Create embed message
    const welcomeEmbed = new EmbedBuilder()
      .setColor('#FFD700') // Gold color
      .setTitle('🌙 ยินดีต้อนรับสู่ HEAVEN OF GOD\'s Discord! ✨')
      .setDescription(`สวัสดีค่าบพี่ ${member}!\n\nคุณเป็นสมาชิกคนที่ **#${memberCount}** 🎉\n\nเริ่มสนุกกันเลย! 💕`)
      .setThumbnail(member.user.displayAvatarURL({ size: 256 }))
      .setImage('https://raw.githubusercontent.com/sakjanonkk/discord-welcome-bot/master/assets/welcome.jpg')
      .setFooter({ 
        text: `Welcome to Heaven of God • ${new Date().toLocaleDateString('th-TH')}`,
        iconURL: member.guild.iconURL()
      })
      .setTimestamp();
    
    // Send welcome message
    await channel.send({ 
      content: `${member}`, // Mention the user
      embeds: [welcomeEmbed] 
    });
    
    console.log(`✅ Welcome message sent to ${member.user.tag} (Member #${memberCount})`);
    
  } catch (error) {
    console.error('❌ Error sending welcome message:', error);
  }
});

// Error handling
client.on('error', (error) => {
  console.error('❌ Discord client error:', error);
});

// Login
console.log('🔄 Connecting to Discord...');
client.login(BOT_TOKEN).catch((error) => {
  console.error('❌ Failed to login:', error);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down Welcome Bot...');
  client.destroy();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Shutting down Welcome Bot...');
  client.destroy();
  process.exit(0);
});

// Keep alive ping
setInterval(() => {
  if (client.isReady()) {
    console.log(`💓 Bot alive - ${new Date().toISOString()}`);
  }
}, 300000); // Every 5 minutes
