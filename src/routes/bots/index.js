const { Router } = require('express')
const router = Router()

router.get('/bots', (req, res)=> {
    let { page, limit, sort, q, certified, category, ids } = req.query
    if (!page) page = 1
    if (!limit) limit = 10
    if (!sort) sort = 'createdAt'
    if (!q) q = ''
    if (!certified) certified = 'false'
    if (!category) category = 'all'
    if (!ids) ids = ''
    if (isNaN(page)) return res.json({ error: 'Invalid page number.'})
    if(isNaN(limit)) return res.json({ errors: 'Invalid limit.'})
    if (['createdAt', 'updatedAt', 'votes', 'servers', 'alphabetical'].includes(sort.toLowerCase()) === false) return res.json({ error: 'Invalid sort.'})
    
})

module.exports = router