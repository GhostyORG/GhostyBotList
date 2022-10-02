const crypto = require('crypto')
const Users = require('../database/models/users')

module.exports = length => {
    const letters = '0123456789'

    let id = ''
    for (let i = 0; i < length; i++) {
        id += letters[Math.floor(Math.random() * letters.length)]
    }

    Users.findOne({ id }).then(user => {
        if (user) {
            return this(length)
        } else {
            return id
        }
    }).catch(err => {
        console.log(err)
    })
}