const crypto = require('crypto')

function createRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
}

module.exports = ( length ) => {
    let values = [ createRandomString(16), createRandomString(4), createRandomString(4), createRandomString(4), createRandomString(12) ]
    let newValue = ""
    for (let i = 0; i < values.length; i++) {
        newValue += crypto.createHash('sha256').update(values[i]).digest('hex').substring(0, (length / values.length+1))
    }

    newValue += crypto.createHash('sha256').update(Math.random().toString(36).substring(2)).digest('hex').substring(0, (length / values.length+1))
    return newValue
}