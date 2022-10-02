const crypto = require('crypto')
const Users = require('../database/models/users')

async function generate(length) {
    const letters = '0123456789'

    let id = ''
    for (let i = 0; i < length; i++) {
        id += letters[Math.floor(Math.random() * letters.length)]
    }
    const user = await Users.findOne({ where: { id } }).select('id')
    if (user) return false

    return id
}

module.exports = async length => {
    let id = await generate(length)
    while (!id) {
        id = await generate(length)
    }

    return id
}