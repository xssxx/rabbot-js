import { SlashCommandBuilder } from 'discord.js';
import { config } from 'dotenv';

config({ path: '../../.env' });

export default {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Select Your Roles'),
    execute: async (client, interaction) => {
        const message = await interaction.reply({
            content: 'Select Your Roles here',
            fetchReply: true,
        });

        await message.react('🐰');

        const collectorFilter = (reaction, user) => {
            return (
                user.id === interaction.user.id && reaction.emoji.name === '🐰'
            );
        };

        const collector = message.createReactionCollector({
            filter: collectorFilter,
            time: 60000, // 60 seconds
        });

        collector.on('collect', (reaction, user) => {
            const member = interaction.guild.members.cache.get(user.id);
            const role = interaction.guild.roles.cache.get(
                process.env.ROLE_BUNNY
            );

            if (member && role) {
                member.roles
                    .add(role)
                    .then(() => {
                        console.log(`Added role to ${user.tag}`);
                        interaction.followUp(
                            'You reacted with a 🐰. Role added successfully.'
                        );
                    })
                    .catch((error) => {
                        console.error(error);
                        interaction.followUp(
                            'An error occurred while adding the role.'
                        );
                    });
            } else {
                interaction.followUp('Could not find the member or role.');
            }
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
        });
    },
};
