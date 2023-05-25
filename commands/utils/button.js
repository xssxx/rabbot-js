import {
    ActionRowBuilder,
    SlashCommandBuilder,
    ButtonBuilder,
    ButtonStyle,
} from 'discord.js';

export default {
    data: new SlashCommandBuilder()
        .setName('calculator')
        .setDescription('Toggle Calculator'),
    ephemeral: true,
    execute: async (_, interaction) => {
        const target = interaction.options.getUser('target');
        const reason =
            interaction.options.getString('reason') ?? 'No reason provided';

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(cancel, confirm);

        await interaction.reply({
            content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
            components: [row],
        });
    },
};
