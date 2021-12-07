"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let sum = 0;
        args.forEach((arg) => {
            sum += parseInt(arg, 10);
        });
        message.reply(`The sum is ${sum}`);
    },
};
