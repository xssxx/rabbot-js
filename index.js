import commands from './commands/index.js';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import { config } from 'dotenv';

config();

class Bot extends Client {
    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessages,
            ],
        });

        this.commands = new Collection();
    }

    loadCommands() {
        for (const command of commands) {
            this.commands.set(command.data.name, command);
        }
    }

    async initialize() {
        this.loadCommands();

        this.once(Events.ClientReady, (c) => {
            console.log(`Logged in as ${c.user.tag}`);
        });

        this.on(Events.InteractionCreate, async (interaction) => {
            // console.log(interaction);

            if (
                !(
                    interaction.isChatInputCommand() ||
                    interaction.isUserContextMenuCommand()
                )
            )
                return;

            const command = this.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(client, interaction);
            } catch (error) {
                console.error(error);
                interaction.deleteReply();
            }
        });

        this.login(process.env.TOKEN);
    }
}

const client = new Bot();
client.initialize();
