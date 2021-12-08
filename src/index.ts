/* eslint-disable import/no-named-default */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const CHANNELS = process.env.CHANNELS || null;

if (!CHANNELS) {
  console.error('CHANNELS is not defined');
  process.exit(1);
}

const channels = CHANNELS.split(',');
console.table(channels);

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  // eslint-disable-next-line global-require
  let handler = require('./command-handler');
  if (handler.default) handler = handler.default;
  handler(client);
  console.log('The bot is ready');
});

client.login(process.env.TOKEN);
