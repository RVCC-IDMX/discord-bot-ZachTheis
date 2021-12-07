"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    callback: (message, ...args) => {
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
    },
};
