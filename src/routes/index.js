const authUser = require('./authUser')
const conversation = require('./conversation')
const message = require('./message')


function route (app) {
    app.use('/api/user', authUser)
    app.use('/api/conversation', conversation)
    app.use('/api/message', message)
}

module.exports = route