const { EmbedBuilder } = require("discord.js")

module.exports = {
    info(client, { title, description }) {
        return new EmbedBuilder()
            .setColor(0x3498db)
            .setTitle(title || 'Info')
            .setDescription(description || 'No description provided.')
            .setTimestamp();
    },
    warn(client, { title, description }) {
        return new EmbedBuilder()
            .setColor(0xf1c40f)
            .setTitle(title || 'Warn')
            .setDescription(description || 'No description provided.')
            .setTimestamp();
    },
    error(client, { title, description }) {
        return new EmbedBuilder()
            .setColor(0xe74c3c)
            .setTitle(title || 'Error')
            .setDescription(description || 'No description provided.')
            .setTimestamp();
    },
    mod(client, { action, user, moderator, reason }) {
        return new EmbedBuilder()
            .setColor(0x9b59b6)
            .setTitle(`Moderation Action: ${action}`)
            .addFields(
                { name: 'User', value: `${user.tag} (${user.id})`, inline: true },
                { name: 'Moderator', value: `${moderator.tag} (${moderator.id})`, inline: true },
                { name: 'Reason', value: reason || 'No reason provided.' }
            )
            .setTimestamp();
    }
};