const app = require('express')()
const glob = require('glob')
const path = require('path')
const bots = require('./database/models/bots')

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var passport = require('passport')
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))
app.use(passport.initialize()) 
app.use(passport.session())
app.use(passport.authenticate('session'))

app.get('/', (req, res) => {
    res.redirect('/v1');
})
glob('./src/routes/**/*.js', (err, files) => {
    files.forEach((file, index) => {
        const route = require(path.join(__dirname, file.split('./src')[1]))
        app.use('/v1',route)
        if (index === files.length-1) {
            app.use((req, res) => {
                res.status(404).json({
                    error: 'Not Found',
                    message: 'The requested resource could not be found.'
                })
            })
            Listen(3000)
        }
    })
})

const Listen = (port = 3000) => {
    app.listen(port, () => {
        console.success(`Server started on port: ${port}`, 'GHOSTY')
    })
}