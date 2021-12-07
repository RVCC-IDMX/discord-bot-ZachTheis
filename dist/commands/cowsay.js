"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cowsay_1 = require("cowsay");
const random_1 = (0, tslib_1.__importDefault)(require("../utils/random"));
const quotes_json_1 = (0, tslib_1.__importDefault)(require("../utils/quotes.json"));
const cows_json_1 = (0, tslib_1.__importDefault)(require("../utils/cows.json"));
function cowsay(name = '') {
    const random = (0, random_1.default)(0, quotes_json_1.default.length);
    const opts = {
        text: `${quotes_json_1.default[random].quote} - ${quotes_json_1.default[random].author}`,
        f: name,
    };
    let output;
    if (name === 'help')
        return `The available cows are:\n${cows_json_1.default.join(', ')}`;
    if (!!name && !cows_json_1.default.includes(name))
        return "That cow isn't in our herd.";
    if (!name)
        opts.r = true;
    output = `
        \`\`\`\n${(0, cowsay_1.say)(opts).replace(/```/g, "``'")}\n
      \`\`\`
      `;
    if (output.length > 2000) {
        output = 'The cows are too big for the barn.';
    }
    return output;
}
exports.default = {
    callback: (message, ...args) => {
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
