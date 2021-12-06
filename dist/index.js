"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = (0, tslib_1.__importStar)(require("discord.js"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const cowsay_1 = (0, tslib_1.__importDefault)(require("./utils/cowsay"));
dotenv_1.default.config();
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
const prefix = process.env.PREFIX;
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id))
        return;
    if (message.content.substring(0, 3) !== prefix)
        return;
    const input = message.content;
    const command = input.slice(3).trim();
    const args = command.split(' ');
    if (args[0] === 'ping') {
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
    }
    if (args[0] === 'cowsay') {
        message
            .react('🥩')
            .then(() => console.log('Reacted to message'))
            .catch(console.error);
        const output = (0, cowsay_1.default)(args[1]);
        message
            .reply(output)
            .then(() => console.log(`Drew a ${args[1] ? args[1] : 'random cow'}`))
            .catch(console.error);
    }
});
client.login(process.env.TOKEN);
