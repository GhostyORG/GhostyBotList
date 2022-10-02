module.exports = {
    name: 'help',
    description: 'Displays all commands.',
    permissions: ['SEND_MESSAGES'],
    options: [
        {
            type: 3,
            name: 'command',
            description: 'The comand to get help for.',
            required: false
        }
    ],
    run: async (interaction, client, guild, args) => {
        return interaction.reply({
            content: 'Hello, ' + args('command') + '!'
        })
    }
}