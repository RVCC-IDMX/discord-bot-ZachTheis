import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import { say } from 'cowsay';

dotenv.config();

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
    let output: string = say({
      text: 'Good luck on your midterms!',
      r: true,
    });
    if (output.length > 2000) {
      output = 'The cows are too big for the barn.';
    }
    message
      .reply({
        content: `
        \`\`\`${output}
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
