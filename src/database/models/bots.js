const { Schema, model } = require('mongoose')

const botSchema = new Schema({
    id: { type: String, required: true },
    profile: { type: Object, required: true },
    prefix: { type: String, required: true },
    information: { type: Object, required: true },
    links: { type: Object, required: true, default: {} },
    stats: { type: Object, required: true, default: {} },
    status: { type: Number, required: true, default: 0 },
    certificate: { type: Number, required: true, default: 0 },
    analytics: { type: Object, required: true, default: {} },
    ratings: { type: Object, required: true, default: {} },
    token: { type: String, required: true, default: 0 },
}, {
    versionKey: false, 
    timestamps: true
});

module.exports = model('bots', botSchema)