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

// client.on('messageCreate', (message) => {
//   if (!channels.includes(message.channel.id)) return;
//   if (message.content.substring(0, 3) !== prefix) return;

//   const input = message.content;
//   const command = input.slice(3).trim();
//   const args = command.split(' ');

// ping
// if (args[0] === 'ping') {
//   message
//     .react('🏓')
//     .then(() => console.log('Reacted to message'))
//     .catch(console.error);
//   message
//     .reply({
//       content: 'pong',
//     })
//     .then(() => console.log('Returned the ball'))
//     .catch(console.error);
// }

// cowsay
//   if (args[0] === 'cowsay') {
// message
//   .react('🥩')
//   .then(() => console.log('Reacted to message'))
//   .catch(console.error);

// const output = cowsay(args[1]);
// message
//   .reply(output)
//   .then(() => console.log(`Drew a ${args[1] ? args[1] : 'random cow'}`))
//   .catch(console.error);
//   }
// });

client.login(process.env.TOKEN);
