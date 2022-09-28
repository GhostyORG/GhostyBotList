const { Router } = require('express')
const router = Router()
const AllBots = require('../../database/models/bots')
const getBot = require('../../utils/getBot')

router.get('/bots', async (req, res) => {
    let { page, limit, sort, q, certified, category, ids } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    if (!sort) sort = 'createdAt'
    if (!q) q = ''
    if (!certified) certified = 'false'
    if (!category) category = 'all'
    if (!ids) ids = ''
    if (isNaN(page)) return res.json({ error: 'Invalid page number.'})
    if (isNaN(limit)) return res.json({ errors: 'Invalid limit.'})
    if (!['createdAt', 'updatedAt', 'votes', 'servers', 'alphabetical'].includes(sort)) return res.json({ error: 'Invalid sort.'})
    if (!['true', 'false'].includes(certified)) return res.json({ error: 'Invalid certified value.'})

    let query = {}
    if (certified.toLowerCase() === 'true') query.certified = { $ne: 0 }
    if (category.toLowerCase() === 'all') query['information.category'] = category 
    if (q) query['$text'] = { $search: q }
    if (ids) query.id = { $in: ids.split(',') }

    let bots = await AllBots.find(query).lean().select('-token -_id').sort(sort.toLowerCase() === 'alphabetical' ? { 'profile.username': 1 } : { [sort.toLowerCase()]: -1 }).skip((page-1)*limit).limit(limit)
    res.json({
        success: true,
        data: {
            queries: {
                page,
                limit,
                sort,
                q,
                certified,
                category,
                ids
            },
            data: bots
        }
    })

})

module.exports = router