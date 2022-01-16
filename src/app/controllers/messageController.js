const Message = require('../models/message')

class MessageController {

    //post add new message
    // /api/message/
    async addMess(req, res) {
        req.body.sender = req.userId
        const newMessage = new Message(req.body)
        try {
            const savedMessage = await newMessage.save()
            res.status(200).json({ success: true, message: 'nice (>.<)', messages: savedMessage })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }

    //get message
    // /api/message/getmess
    async getMess(req, res) {
        try {
            const messages = await Message.find({
                ConversationId: req.params.conversationId,
                $in: [{sender: req.userId}]
            })
            res.status(200).json({ success: true, message: "nice (>.<) get message successfully", messages: messages })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }
}

module.exports = new MessageController