const crypto = require('crypto')
const Bots = require('../database/models/bots')
const Users = require('../database/models/users')

function createRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}
async function generate(length) {
    let values = [ createRandomString(16), createRandomString(4), createRandomString(4), createRandomString(4), createRandomString(12) ]
    let newValue = ""
    for (let i = 0; i < values.length; i++) {
        newValue += crypto.createHash('sha256').update(values[i]).digest('hex').substring(0, (length / values.length+1))
    }

    newValue += crypto.createHash('sha256').update(Math.random().toString(36).substring(2)).digest('hex').substring(0, (length / values.length+1))

    const user = await Users.find({ token: newValue }).countDocuments()
    if (user > 0) return false
    while (user > 1) {
        resetUserTokens([ await Users.find({ token: newValue }).select('id') ])
    }

    const bot = await Bots.find({ token: newValue }).countDocuments()
    if (bot > 0) return false
    while (bot > 1) {
        resetBotTokens([ await Bots.find({ token: newValue }).select('id') ])
    }

    return newValue
}

async function resetBotTokens(ids) {
    let bots = await Bots.find({ id: { $in: ids } })
    for (let i = 0; i < bots.length; i++) {
        bots[i].token = await generate(72)
        await bots[i].save()
    }
}

async function resetUserTokens(ids) {
    let users = await Users.find({ id: { $in: ids } })
    for (let i = 0; i < users.length; i++) {
        users[i].token = await generate(72)
        await users[i].save()
    }
}
module.exports = async length => {
    let id = await generate(length)
    while (!id) {
        id = await generate(length)
    }

    return id
}