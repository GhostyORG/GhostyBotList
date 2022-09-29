module.exports = {
    name: 'help',
    permissions: ['SEND_MESSAGES'],
    run: async (interaction, client, guild, args) => {
        return interaction.reply({
            content: 'Hello!'
        })
    }
}