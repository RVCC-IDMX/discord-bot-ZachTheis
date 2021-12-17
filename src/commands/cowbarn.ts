/* eslint-disable comma-dangle */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import { say, IOptions } from 'cowsay';
import { Message, MessageEmbed } from 'discord.js';
import cows from '../utils/cows.json';

export default {
  callback: (message: Message, ...args: string[]) => {
    const name = args[1];
    if (name === 'help') return `The available cows are:\n${cows.join(', ')}`;
    if (!!name && !cows.includes(name)) return "That cow isn't in our herd.";

    const opts: IOptions = {
      f: name,
      text: 'Moo!',
    };
    let output: string = say(opts);
    if (output.length > 4096) output = output.slice(0, 4095);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Cow Barn')
      .setURL('https://discord.js.org/')
      // .setAuthor(
      //   'Some name',
      //   'https://i.imgur.com/AfFp7pu.png',
      //   'https://discord.js.org'
      // )
      .setDescription(output)
      // .addFields(
      //   { name: 'Regular field title', value: 'Some value here' },
      //   { name: '\u200B', value: '\u200B' },
      //   { name: 'Inline field title', value: 'Some value here', inline: true },
      //   { name: 'Inline field title', value: 'Some value here', inline: true }
      // )
      // .addField('Inline field title', 'Some value here', true)
      // .setImage('https://i.imgur.com/AfFp7pu.png')
      // .setTimestamp()
      .setFooter(`${'\u2800'.repeat(10 /* any big number works too */)}|`);

    message
      .react('🥩')
      .then(() => console.log('Reacted to message'))
      .catch(console.error);
    message
      .reply({ embeds: [embed] })
      .then(() => console.log(`Drew a ${args[1]} in a barn`))
      .catch(console.error);
  },
};
