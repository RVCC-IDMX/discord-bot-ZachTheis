/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

const axios = require('axios');

const { OPEN_WEATHER } = process.env;

export default {
  callback: async (message: Message, ...args: string[]) => {
    const inputCity = args.join(' ');
    const url = `api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${OPEN_WEATHER}`;
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
    const weatherDescription = weatherData.description;
    const lowTemp = weatherData.main.temp_min;
    const highTemp = weatherData.main.temp_max;
    const weatherIcon = weatherData.weather[0].icon;
    const rawSunrise = weatherData.sys.sunrise;
    const rawSunset = weatherData.sys.sunset;

    let currentTemp = weatherData.main.temp;
    if (currentTemp <= currentTemp.round() + 0.5) {
      currentTemp = currentTemp.floor();
    } else currentTemp = currentTemp.ceil();

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Current Weather in ${city} - ${countryCode}`)
      .setDescription(`${currentTemp} °F and ${weatherDescription}`)
      .addFields(
        { name: 'Low', value: `${lowTemp} °F`, inline: true },
        { name: 'High', value: `${highTemp} °F`, inline: true }
      )
      .addFields(
        { name: 'Sunrise', value: 'Dawn', inline: true },
        { name: 'Sunset', value: 'Dusk', inline: true }
      )
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
