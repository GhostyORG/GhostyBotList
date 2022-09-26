const {
    connect
} = require("mongoose")

connect('mongodb://localhost:270177/ghostylists', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => console.error('Something went wrong while connecting to database.\n' + err.message, 'GHOSTY'))