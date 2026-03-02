const { ensure } = require('../../core/modulesManager');
const sender = require('./sender');
const types = require('./types');

module.exports = {
    onload(client) {
        const cfg = ensure('systems', 'logger', {
            webhook: {
                url: '',
                username: 'Logger',
                avatarURL: ''
            }
        });
        client.logger = {};

        client.logger.send = (embed, options = {}) => sender(client, cfg, embed, options);

        for (const [name, builder] of Object.entries(types)) {
            client.logger[name] = (data = {}, options = {}) => {
                const embed = builder(client, data);
                return sender(client, cfg, embed, options);
            };
        } console.log('Logger system loaded');
    },
    onUnload(client) {
        delete client.logger;
        console.log('Logger system unloaded');
    }
};