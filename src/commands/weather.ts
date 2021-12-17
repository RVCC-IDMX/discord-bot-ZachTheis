/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */

import { Message, MessageEmbed } from 'discord.js';
import fetch from 'node-fetch';

// const axios = require('axios');
// const { OPEN_WEATHER } = process.env;

export default {
  callback: (message: Message, ...args: string[]) => {
    const inputCity = args[0];
    let weatherData;
    exports.handler = async (event) => {
      weatherData = await fetch(
        `api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial`,
        {
          method: 'GET',
          headers: {
            Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
          },
        }
      )
        .then(
          (response) =>
            // eslint-disable-next-line implicit-arrow-linebreak
            response.json()
          // eslint-disable-next-line function-paren-newline
        )
        .catch((error) => console.log('error', error));

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(weatherData),
      };
    };

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

// export default {
//   callback: (message: Message, ...args: string[]) => {
//     const inputCity = args[0];
//     // eslint-disable-next-line no-unused-vars
//     exports.handler = async (event, context) => {
// eslint-disable-next-line max-len
//       const url = `api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=imperial&appid=${OPEN_WEATHER}`;
//       try {
//         const weatherStream = await axios.get(url, {
//           headers: {
//             Accept: 'application/jsons',
//             'User-Agent': 'axios 0.21.1',
//           },
//         });
//         return {
//           statusCode: 200,
//           body: JSON.stringify(weatherStream.data),
//         };
//       } catch (err) {
//         console.log(err);
//         return { statusCode: 422, body: err.stack };
//       }
//     };
//   },
// };
