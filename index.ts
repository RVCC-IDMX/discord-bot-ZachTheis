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
    message.react('🏓').catch(console.error);
    message.reply({
      content: 'pong',
    });
  }
});

client.on('messageCreate', (message) => {
  if (message.content === 'cowsay') {
    message.reply({
      content: `
      \`\`\`
      ${output}
      \`\`\`
      `,
    });
    message.react('🥩').catch(console.error);
  }
});

client.login(process.env.TOKEN);
