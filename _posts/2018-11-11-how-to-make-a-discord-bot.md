---
layout: post
title: How to make a discord bot
date: 2018-11-11 09:00:45+00
tags: [mrpowerscripts, git, discord bot, how to make a discord bot, discord bot help, discordjs]
description-long: Discord is probably one of my favorite apps ever. They started off with a simple idea and worked really hard to add features over time. Though the software hasn't suffered from its rapid development and release cycles. A lot of times you'll see apps with the growth of Discord become bloated. Discord has managed to remain simple, but still has lots of power available to the user.
---

Discord is probably one of my favorite apps ever. They started off with a simple idea and worked really hard to add features over time. Though the software hasn't suffered from its rapid development and release cycles. {% include youtubePlayer.html id="kieSx_pzpCU" %} A lot of times you'll see apps with the growth of Discord become bloated. Discord has managed to remain simple, but still has lots of power available to the user.

One of the places where Discord really shines is their API. Allowing people to interface with the Discord app programmatically. With helpful libraries like [DiscordJS](https://github.com/discordjs/discord.js/) it's possible to help automate many tasks that are helpful during the chatting experience.

It's not that difficult to get started with making a discord bot. I've created a template based on various other bot ideas I've seen. You can find the full example [here on GitHub](https://github.com/MrPowerScripts/simple-discord-chat-bot). Here's the main code that powers the bot.

```javascript
import Discord from 'discord.js'
import config from './config.json'


// choose the enviroment variables as config if they exist
let { 
      DISCORD_TOKEN,
    } = process.env

if (DISCORD_TOKEN){ config.discordToken = DISCORD_TOKEN}

console.log(process.env.NODE_ENV)

// THIS IS THE MAGIC RIGHT HERE YA'LL
function bot() {
  // Initialize Discord Bot
  let bot = new Discord.Client();

  bot.on('message', msg => {
      // don't talk to other bots
      if (msg.author.bot) return;
  
      // Also good practice to ignore any message that does not start with our prefix, 
      // which is set in the configuration file.
      if (msg.content.indexOf('!') !== 0) return;

      // parse the chat message to get the command that was run
      let args = msg.content.substring(1).split(' ')
      let cmd = args[0]
      args = args.splice(1)

      switch(cmd) {
        // check to see if the bot is alive
        case "ping":
          msg.reply('pong')
          break
        default:
      }
  });

  bot.login(config.discordToken)
}

process.on('SIGINT', () => {
    process.exit()
})

bot()
```

It's really not that much. The video goes into detail explaining all of the working parts. It also shows in real time that with the template repo you can get your bot running in less than 5 minutes. How awesome is that? Pretty awesome I would say.


