import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check Ping!'),
    execute: async (client, interaction) => {
        await interaction.reply({
            content: 'Pinging...',
            fetchReply: true,
        });
        interaction.editReply(`Ping ${client.ws.ping}ms`);
    },
};
