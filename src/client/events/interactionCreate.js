const { EmbedBuilder } = require("discord.js")
const { commands } = require("../")

module.exports = {
    name: 'interactionCreate',
    run: async (interaction) => {
        if (!interaction.isChatInputCommand()) return
        try {
            let commandName = interaction.commandName
            let command = commands.find(cmd => cmd.name === commandName)
            if (!command) {
                return interaction.reply({
                    content: 'Command not found.'
                })
            } else {
                const args = (value) => {
                    try {
                        const options = interaction.options._hoistedOptions

                        if (!options) return null
                        if (!Array.isArray(options)) return null
                        let option = options.find(opt => opt.name === value)
                        if (!option) return null

                        return option.value
                    } catch (error) {
                        return null
                    }
                }
            }

            command.run(interaction, global.client, interaction.guild, args)
        } catch (error) {
            const ErrorEmbed = new EmbedBuilder()
                .setAuthor({ name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL() })
                .setColor("DarkRed")
                .setTitle("Something went wrong!")
                .setDescription("An error occured while trying to execute the command.\n```bash\n" + error.message + "\n```")
                .setTimestamp()

            interaction.reply({ embeds: [ErrorEmbed] })
        }
    }
}

