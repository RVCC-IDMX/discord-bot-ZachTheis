import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let sum = 0;

    args.forEach((arg: string) => {
      sum += parseInt(arg, 10);
    });

    message.reply(`The sum is ${sum}`);
  },
};
