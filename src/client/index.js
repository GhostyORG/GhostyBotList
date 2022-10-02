const { Client, GatewayIntentBits, REST, Routes } = require("discord.js")
const glob = require("glob")
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
 })
const commands = []

glob('./src/client/commands/*.js', (err, files) => {
    if (err) throw err
    files.forEach((file, index) => {
        const cmd = require(`./commands/${file.split('/').pop().split('.')[0]}`)
        commands.push({
            name: cmd.name,
            description: cmd.description || 'No Description Provided',
            permissions: cmd.permissions ?? [],
            options: cmd.options ?? [],
            run: cmd.run
        })
        if (index === files.length-1) {
            console.info(`Total Commands: ${files.length}`)
        }
    })
})

glob('./src/client/events/*.js', (err, files) => {
    if (err) throw err
    files.forEach((file, index) => {
        const cmd = require(`./events/${file.split('/').pop().split('.')[0]}`)
        client.on(cmd.name, cmd.run)
        if (index === files.length-1) {
            console.info(`Total Events: ${files.length}`)
        }
    })
})

const rest = new REST({ version: '10' }).setToken(global.config.client.token)

client.on("ready", async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { 
            body: commands 
        })

        console.success(`Succesffuly reloaded application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
    console.success(`Logged into: ${client.user.tag}`)
}).login(global.config.client.token).catch(err => {
    console.error(`Invalid Bot Token.`)
})

module.exports = client
module.exports.command = commands