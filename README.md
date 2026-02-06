# 🎮 Discord Welcome Bot

Auto-welcome bot for HEAVEN OF GOD's Discord server.

## Features

- 🖼️ Shows user avatar
- 🎁 Displays welcome GIF
- 💬 Sends personalized welcome message
- 📊 Shows member count
- @ Mentions new member

## Setup

### 1. Environment Variables

Copy `.env.example` to `.env` and fill in:

```env
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_GUILD_ID=497054067445596160
DISCORD_WELCOME_CHANNEL_ID=800300152002183188
DISCORD_WELCOME_GIF=https://tenor.com/f5dvtvVP1ZX.gif
```

### 2. Local Development

```bash
npm install
npm start
```

### 3. Docker

```bash
docker build -t discord-welcome-bot .
docker run -d \
  --name discord-welcome-bot \
  --env-file .env \
  --restart unless-stopped \
  discord-welcome-bot
```

### 4. Dokploy Deployment

1. Push to GitHub
2. Create new service in Dokploy
3. Set environment variables
4. Deploy!

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DISCORD_BOT_TOKEN` | Bot token from Discord Developer Portal | ✅ Yes |
| `DISCORD_GUILD_ID` | Server ID | ✅ Yes |
| `DISCORD_WELCOME_CHANNEL_ID` | Welcome channel ID | ✅ Yes |
| `DISCORD_WELCOME_GIF` | URL of welcome GIF | Optional |

## Requirements

- Node.js 18+
- Discord bot with:
  - Server Members Intent
  - Message Content Intent
  - Permissions: View Channels, Send Messages, Embed Links, Mention Everyone

## License

MIT

---

Made with 💕 by Secretary (เลขาสุดน่ารัก)
