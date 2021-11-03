import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { say } from 'cowsay';

dotenv.config();

const output: string = say({ text: "It's the Midterm! The steaks are high!" });

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
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
});

client.on('messageCreate', (message) => {
  if (message.content === 'cowsay') {
    message
      .reply({
        content: `
      \`\`\`
      ${output}
      \`\`\`
      `,
      })
      .then(() => console.log('Drew a cow'))
      .catch(console.error);
    message
      .react('🥩')
      .then(() => console.log('Reacted to message'))
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
