const mongoose = require('mongoose')

const schema = mongoose.Schema({
    picture: {
        type: Buffer,
        required: true
    }
})

module.exports = mongoose.model('Raw', schema)