/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';

dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const prefix = process.env.PREFIX;

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content.substring(0, 3) === prefix) {
    const input = message.content;
    const command = input.slice(3).trim();
    const args = command.split(' ');
    if (args[1] === 'ping') {
      message
        .react('🏓')
        .then(() => console.log('Reacted to message'))
        .catch(console.error);
      message
        .reply({
          content: 'pong',
        })
        .then(() => console.log('Returned the ball'))
        .catch(console.error);
    }
    if (args[1] === 'cowsay') {
      message
        .react('🥩')
        .then(() => console.log('Reacted to message'))
        .catch(console.error);
      const output = cowsay();
      message
        .reply(output)
        .then(() => console.log('Drew a cow'))
        .catch(console.error);
    }
  }
});

client.login(process.env.TOKEN);
