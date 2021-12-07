import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let sum = 0;

    // eslint-disable-next-line no-restricted-syntax
    for (const arg of args) {
      sum += parseInt(arg, 10);
    }

    message.reply(`The sum is ${sum}`);
  },
};
