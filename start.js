require('cute-logs')
const { connection, connect } = require('mongoose')

require('./src/database/connect')

connection.on('connected', () => {
    console.success('Connected to database.', 'GHOSTY')
    require('./src/index')
})
