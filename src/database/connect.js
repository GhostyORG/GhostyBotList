const {
    connect
} = require("mongoose")

connect('mongodb+srv://admin:admin@cluster0.qro2b.mongodb.net/GhostyListsBot', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => console.error('Something went wrong while connecting to database.\n' + err.message, 'GHOSTY'))