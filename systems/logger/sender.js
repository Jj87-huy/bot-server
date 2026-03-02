const { WebhookClient, EmbedBuilder } = require('discord.js');
const config = require('../../config');

module.exports = async function send(client, cfg, embed, options = {}) {
    if (!embed) return;
    if (!embed instanceof EmbedBuilder) {
        embed = new EmbedBuilder(embed);
    }

    let webhookUrl = options.webhookUrl || cfg.webhook?.access?.startWith('http') ? cfg.webhook.access : null;
    let channelId = options.channelId || (!cfg.webhook?.access?.startWith('http') ? cfg.webhook?.access : null) || config.bot.logChannelId;

    if (webhookUrl) {
        const hook = new WebhookClient({ url: webhookUrl });

        return hook.send({
            username: cfg.webhook?.username || 'Logger',
            avatarURL: cfg.webhook?.avatarURL || '',
            embeds: [embed]
        });
    }

    if (channelId) {
        const channel = await client.channels.fetch(channelId).catch(() => null);
        if (!channel) return;
        return channel.send({ embeds: [embed] });   
    }
};