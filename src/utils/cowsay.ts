/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { say, IOptions } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';
import cows from './cows.json';

export default function (name: string = '') {
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
