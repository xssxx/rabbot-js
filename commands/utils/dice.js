import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('dice')
        .setDescription('Roll a dice')
        .addStringOption((option) =>
            option
                .setName('count')
                .setDescription('Dice count')
                .setRequired(false)
                .setMaxLength(2)
        ),
    execute: async (client, interaction) => {
        const count = interaction.options.getString('count') || 1;
        const result = Math.floor(Math.random() * 7 * count) + 1;
        await interaction.reply(`Your dice🎲 result is: ${result}`);
    },
};
