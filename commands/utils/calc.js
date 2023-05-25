import { SlashCommandBuilder } from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('calc')
        .setDescription('Calculate expression')
        .addStringOption((option) =>
            option
                .setName('expression')
                .setDescription('The mathematical expression to evaluate')
                .setRequired(true)
                .setMaxLength(100)
        ),
    execute: async (client, interaction) => {
        try {
            const expression = interaction.options.getString('expression');
            const result = String(eval(expression));

            if (result !== 'Infinity') {
                await interaction.reply(`${expression} = ${result}`);
            } else {
                await interaction.reply('undefined');
            }
        } catch (err) {
            await interaction.reply('Error');
        }
    },
};
