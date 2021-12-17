'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tslib_1 = require('tslib');
const dotenv_1 = (0, tslib_1.__importDefault)(require('dotenv'));
const get_files_1 = (0, tslib_1.__importDefault)(require('./get-files'));
console.log(get_files_1.default);
dotenv_1.default.config();
const prefix = process.env.PREFIX;
let suffix = '.ts';
let src = 'src';
if (process.env.NODE_ENV === 'production') {
  suffix = '.js';
  src = 'dist';
  console.log('Running in production mode');
}
console.log('Running handler.');
exports.default = (client) => {
  const commands = {};
  const commandFiles = (0, get_files_1.default)(src, './commands', suffix);
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
    // console.log(message.content);
    if (message.author.bot || !message.content.startsWith(prefix)) {
      return;
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    console.log(args);
    const commandName = args.shift().toLowerCase();
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
