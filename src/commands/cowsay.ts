/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { say, IOptions } from 'cowsay';
import { Message } from 'discord.js';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import cows from '../utils/cows.json';

function cowsay(name: string = '') {
  const random = getRandomInt(0, quotes.length);
  const opts: IOptions = {
    text: `${quotes[random].quote} - ${quotes[random].author}`,
    f: name,
  };
  let output: string;

  if (name === 'help') return `The available cows are:\n${cows.join(', ')}`;
  if (!!name && !cows.includes(name)) return "That cow isn't in our herd.";
  if (!name) opts.r = true;

  output = `
        \`\`\`\n${say(opts).replace(/```/g, "``'")}\n
      \`\`\`
      `;
  if (output.length > 2000) {
    output = 'The cows are too big for the barn.';
  }
  return output;
}

export default {
  callback: (message: Message, ...args: string[]) => {
    message
      .react('🥩')
      .then(() => console.log('Reacted to message'))
      .catch(console.error);

    const output = cowsay(args[1]);
    message
      .reply(output)
      .then(() => console.log(`Drew a ${args[1] ? args[1] : 'random cow'}`))
      .catch(console.error);
  },
};
