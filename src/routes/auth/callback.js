const { Router } = require('express')
const router = Router()
const passport = require('passport')
const Handler = require('passport-handler').default
const Users = require('../../database/models/users')
const generateId = require('../../utils/generateId')
const createToken = require("../../utils/createToken")

router.get('/auth/callback', Handler(passport.authenticate('discord'), {
    error: (err, req, res, next) => {
        res.redirect('/v1/auth/login')
    },
    success: async (req, res, next) => {
        req.session.user = req.session.passport.user

        try {
            const user = await Users.findOne({ where: { 'profile.id': req.session.user.id } }).select('profile.id')
            if (!user) {
                const id = await generateId(18)
                const newUser = await Users.create({
                    id,
                    profile: {
                        id: req.session.user.id, 
                        username: req.session.user.username, 
                        discriminator: req.session.user.discriminator, 
                        avatar: req.session.user.avatar,
                        tag: req.session.user.username + '#' + req.session.user.discriminator
                    },
                    permissions: [],
                    isBanned: false,
                    token: await createToken(72)
                })
                req.session.user = newUser
            } else {
                if (user.isBanned) return res.json({
                    success: false,
                    message: 'You are banned from using this service.'
                })
                const updatedUser = await Users.updateOne({
                    profile: {
                        id: req.session.user.id, 
                        username: req.session.user.username, 
                        discriminator: req.session.user.discriminator, 
                        avatar: req.session.user.avatar,
                        tag: req.session.user.username + '#' + req.session.user.discriminator
                    },
                    token: await createToken(72)
                })
                req.session.user = updatedUser
            }
        } catch (error) {
            return res.redirect('/v1/auth/login')
        }

        req.session.save()
        res.json(req.session.user)
    }
}))

module.exports = router