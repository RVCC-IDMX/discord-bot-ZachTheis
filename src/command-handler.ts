/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import dotenv from 'dotenv';
import { Client } from 'discord.js';
import getFiles from './get-files';

dotenv.config();

const prefix = process.env.PREFIX;

let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}

export default (client: Client) => {
  const commands = {} as {
    [key: string]: any;
  };

  const commandFiles = getFiles(src, './commands', suffix);
  console.log(commandFiles);

  commandFiles.forEach((command) => {
    let commandFile = require(command);
    if (commandFile.default) commandFile = commandFile.default;

    const split = command.replace(/\\/g, '/').split('/');
    const commandName = split[split.length - 1].replace(suffix, '');

    commands[commandName.toLowerCase()] = commandFile;
  });

  console.log(commands);

  client.on('messageCreate', (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) {
      return;
    }

    const args = message.content.slice(prefix.length).trim().split(' ');
    const commandName = args.shift()!.toLowerCase();

    if (!commands[commandName]) {
      return;
    }

    try {
      commands[commandName].callback(message, ...args);
    } catch (error) {
      console.error(error);
    }
  });
};
