const { Router } = require('express')
const router = Router()
const passport = require('passport')
var DiscordStrategy = require('passport-discord').Strategy

passport.use(new DiscordStrategy({
    clientID: global.config.client.id,
    clientSecret: global.config.client.secret,
    callbackURL: global.config.client.callback,
    scope: global.config.client.scopes
}, function (accessToken, refreshToken, profile, done) {
    process.nextTick(() => done(null, profile))
}))

router.get('/auth/login', (req, res, next) => {
    if (req?.query?.code) return res.redirect('/v1/auth/login')
    const params = req.query
    req.session.next = (params?.next ?? '/') || '/'
    req.session.joinServer = (params?.joinServer === "true" ? true : false ?? false) || false

    req.session.save()
    next()
}, passport.authenticate("discord", { prompt: 'none' }))


module.exports = router