const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullName: { type: 'string', required: true },
    phone: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    location: { type: 'string', default: ''},
    email: { type: 'string', default: ''},
    profilePicture: { type: 'string', },
    birthday: { type: 'string', default: ''},
    vouchers: { type: 'string', default: ''},
}, {
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)