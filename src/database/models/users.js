const { Schema, model } = require('mongoose')

module.exports = model('users', new Schema({
    id: { type: String, required: true },
    profile: { type: Object, required: true },
    permissions: { type: Array, required: true, default: [] },
    isBanned: { type: Boolean, required: true, default: false },
    token: { type: STring, required: true, default: null }
}, {
    versionKey: false,
    timestamps: true
}))