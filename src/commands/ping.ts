import { Message } from 'discord.js';

export default {
  // eslint-disable-next-line no-unused-vars
  callback: (message: Message, ...args: string[]) => {
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
  },
};
