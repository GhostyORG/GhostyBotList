module.exports = {
    name: 'help',
    description: 'Displays all commands.',
    permissions: ['SEND_MESSAGES'],
    options: [],
    run: async (interaction, client, guild, args) => {
        return interaction.reply({
            content: 'Hello!'
        })
    }
}