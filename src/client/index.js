const { Client, GatewayIntentBits, REST, Routes } = require("discord.js")
const glob = require("glob")
const path = require("path")
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
        const cmd = require(path.join(__dirname, file.split('./src')[1]))
        commands.push(cmd)
        if (index === files.length-1) {
            console.info(`Total Commands: ${files.length}`)
        }
    })
})

glob('./src/client/events/*.js', (err, files) => {
    if (err) throw err
    files.forEach((file, index) => {
        const cmd = require(path.join(__dirname, file.split('./src')[1]))
        client.on(cmd.name, cmd.run)
        if (index === events.length-1) {
            console.info(`Total Events: ${files.length}`)
        }
    })
})

const rest = new REST({ version: '10' }).setToken('token')

client.on("ready", async () => {
    try {
        console.info("Started refreshing application (/) commands.")
        await rest.put(Routes.applicationCommands(client.id), { body: commands })
        console.success(`Successfully reloaded application (/) commands.`)
    } catch (error) {
        console.error(error)
    }
    console.success(`Logged into: ${client.user.tag}`)
}).login('token').catch(err => {
    console.error(`Invalid bot token.`)
})