/* eslint-disable import/no-named-default */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { default as cowsay, specificCow } from './utils/cowsay';

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
    if (args[0] === 'ping') {
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
    if (args[0] === 'cowsay') {
      message
        .react('🥩')
        .then(() => console.log('Reacted to message'))
        .catch(console.error);
      if (args.length === 1) {
        const output = cowsay();
        message
          .reply(output)
          .then(() => console.log('Drew a random cow'))
          .catch(console.error);
      } else if (args.length === 2) {
        const output = specificCow(args[1]);
        message
          .reply(output)
          .then(() => console.log('Drew a specified cow'))
          .catch(console.error);
      }
    }
  }
});

client.login(process.env.TOKEN);
