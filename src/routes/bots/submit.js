const {
    Router
} = require('express')
const router = Router()
const AllBots = require('../../database/models/bots')

router.post('/bots/submit', async (req, res) => {
    try {
        const {
            id,
            prefix,
            overview,
            description,
            owner,
            coowners,
            tags,
            links
        } = req.body

        if (!id) return res.json({
            error: 'No ID provided'
        });
        if (!prefix) return res.json({
            error: 'No prefix provided'
        });
        if (!overview) return res.json({
            error: 'No overview provided'
        });
        if (!description) return res.json({
            error: 'No description provided'
        });
        if (!owner) return res.json({
            error: 'No owner provided'
        });
        if (!tags) return res.json({
            error: 'No tags provided'
        });

        if (typeof id !== 'string') return res.json({
            error: 'ID must be a string.'
        })
        if (typeof prefix !== 'string') return res.json({
            error: 'Prefix must be a string.'
        })
        if (typeof overview !== 'string') return res.json({
            error: 'Overview must be a string.'
        })
        if (typeof description !== 'string') return res.json({
            error: 'Description must be a string.'
        })
        if (typeof owner !== 'string') return res.json({error: 'Owner must be a string.'})

        if (tags.length > 5) return res.json({ error: 'You can only have 5 tags.'})
        if (tags.length < 1) return res.json({error: 'You must have at least 1 tag.'})

        if (tags.some(tag => typeof tag !== 'string')) return res.json({error: 'Tags must be a string.'})
        const data = await getBot(id)
        if (!data) return res.json({ error: 'Bot not found.'})

        new AllBots({
            id,
            prefix,
            profile: {
                avatar: data.bot.avatar,
                avatarURL: `https://cdn.discordapp.com/avatars/${data.bot.id}/${data.bot.avatar}.png`,
                username: data.bot.username,
                discriminator: data.bot.discriminator,
                tag: data.bot.username + '#' + data.bot.discriminator
            },
            information: {
                overview,
                description,
                owner,
                coowners,
                tags
            },
            links,
            status: 0,
            certificate: 0,
            stats: {
                dailyVotes: 0,
                weeklyVotes: 0,
                monthlyVotes: 0
            }
        }).save().then(() => {
            res.json({ 
                success: true,
                message: 'Bot submitted successfully.'
            })
        }).catch(err => {
            res.json({ 
                success: false,
                message: 'An error occured while submitting your bot.',
                error: err.message
             })
        })
    } catch (e) {
        res.json({
            success: false,
            message: 'An error occured while trying to submit your bot.',
            error: e.message
        })
    }

})

module.exports = router