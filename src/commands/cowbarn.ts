/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { say, IOptions } from 'cowsay';
import { Message, MessageEmbed } from 'discord.js';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import cows from '../utils/cows.json';

export default {
  callback: (message: Message, ...args: string[]) => {
    const name = args[0];
    if (name === 'help') return `The available cows are:\n${cows.join(', ')}`;
    if (!!name && !cows.includes(name)) return "That cow isn't in our herd.";

    const random = getRandomInt(0, quotes.length);
    const quote = quotes[random].quote;
    const author = quotes[random].author;

    const opts: IOptions = {
      f: name,
      text: 'Moo!',
    };
    let output = `
        \`\`\`\n${say(opts).replace(/```/g, "``'")}\n
      \`\`\`
      `;
    if (output.length > 4096) output = output.slice(0, 4095);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Cow Barn')
      // .setURL('https://discord.js.org/')
      // .setAuthor(
      //   'Some name',
      //   'https://i.imgur.com/AfFp7pu.png',
      //   'https://discord.js.org'
      // )
      .setDescription(output)
      .addFields(
        //   { name: 'Regular field title', value: 'Some value here' },
        { name: '\u200B', value: `"${quote}"` },
        { name: '\u200B', value: `-${author}` }
        //   { name: 'Inline field title', value: 'Some value here', inline: true }
      )
      // .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      .setTimestamp()
      .setFooter('\u2800\u2800\u2800\u2800\u2800\u2800\u2800'.repeat(20));

    message
      .react('🐄')
      .then(() => console.log('Reacted to message'))
      .catch(console.error);
    message
      .reply({ embeds: [embed] })
      .then(() => console.log(`Drew ${name} in a barn`))
      .catch(console.error);
  },
};
