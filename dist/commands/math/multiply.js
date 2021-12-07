"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
        let product = 1;
        args.forEach((arg) => {
            product *= parseInt(arg, 10);
        });
        message.reply(`The product is ${product}`);
    },
};
