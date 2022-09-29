require('cute-logs')
const { connection } = require('mongoose')
const config = global.config = require('./config.json')

require('./src/database/connect')

connection.on('connected', () => {
    console.success('Connected to database.', 'GHOSTY')
    const Client = require('./src/client')
    Client.on('ready', () => {
        require('./src/index')
    })
})
