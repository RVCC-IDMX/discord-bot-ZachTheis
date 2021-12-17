/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */

import { Message, MessageEmbed } from 'discord.js';
import moment from 'moment';

const axios = require('axios');

const { OPEN_WEATHER } = process.env;

export default {
  callback: async (message: Message, ...args: string[]) => {
    const inputCity = args.join(' ');
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${OPEN_WEATHER}`;
    let response;
    try {
      response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      message.reply('All oracles are currently busy.');
      return;
    }

    const weatherData = response.data;
    const city = weatherData.name;
    const countryCode = weatherData.sys.country;
    const weatherDescription = weatherData.weather[0].description;
    const currentTemp = weatherData.main.temp.toFixed(0);
    const lowTemp = weatherData.main.temp_min.toFixed(0);
    const highTemp = weatherData.main.temp_max.toFixed(0);
    const weatherIcon = weatherData.weather[0].icon;
    const rawSunrise = weatherData.sys.sunrise;
    const rawSunset = weatherData.sys.sunset;
    const tz = weatherData.timezone;
    const sunrise = moment
      .unix(rawSunrise + tz)
      .utc()
      .format('h:mm:ss A');
    const sunset = moment
      .unix(rawSunset + tz)
      .utc()
      .format('h:mm:ss A');

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Current Weather in ${city} - ${countryCode}`)
      .setAuthor('Zach Theis')
      .setDescription(`${currentTemp} °F and ${weatherDescription}`)
      .addFields(
        { name: 'Low', value: `${lowTemp} °F`, inline: true },
        { name: 'High', value: `${highTemp} °F`, inline: true }
      )
      .addField('\u200b', '\u200b')
      .addFields(
        { name: 'Sunrise', value: `${sunrise}`, inline: true },
        { name: 'Sunset', value: `${sunset}`, inline: true }
      )
      .addField('\u200b', '\u200b')
      .setThumbnail(`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`)
      .setTimestamp();

    message
      .react('🌦️')
      .then(() => console.log('Reacted to message'))
      .catch(console.error);
    message
      .reply({ embeds: [embed] })
      .then(() => console.log(`Predicted the weather in ${inputCity}`))
      .catch(console.error);
  },
};
