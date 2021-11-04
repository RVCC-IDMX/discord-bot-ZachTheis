/* eslint-disable func-names */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

import { say } from 'cowsay';
import getRandomInt from './random';
import quotes from './quotes.json';
import cows from './cows.json';

export default function () {
  const random = getRandomInt(0, quotes.length);
  let output: string = say({
    text: `${quotes[random].quote} - ${quotes[random].author}`,
    r: true,
  });
  output = `
        \`\`\`${output}
      \`\`\`
      `;
  if (output.length > 2000) {
    output = 'The cows are too big for the barn.';
  }
  return output;
}

export function specificCow(name: string) {
  const random = getRandomInt(0, quotes.length);
  let output: string;
  if (cows.includes(name)) {
    output = say({
      text: `${quotes[random].quote} - ${quotes[random].author}`,
      f: name,
    });
    output = `
        \`\`\`${output}
      \`\`\`
      `;
  } else if (name === 'help') {
    output = `The available cows are:\n${cows.join(', ')}`;
  } else {
    output = "That cow isn't in our herd.";
  }
  if (output.length > 2000) {
    output = 'The cows are too big for the barn.';
  }
  return output;
}
