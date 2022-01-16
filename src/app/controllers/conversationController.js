const Conversation = require('../models/conversation')
const User = require('../models/userModel')

class ConversationController {

    async getAllConversations(req, res) {
        await Conversation.find({})
            .then(conversations => {
                try {
                    return res.json({ success: true, message: 'nice (>.<)', conversations })
                } catch (error) {
                    return res.json({ success: false, message: error })
                }
            })
            .catch(error => res.status(500).json({ success: false, message: error.message }))
    }


    //create new Conversation
    //post /api/conversation/
    async createConversation(req, res) {

        const checkRevicerId = req.body.receiverId
        if (!checkRevicerId)
            return res.status(404).json({ success: false, message: "missing user reciver" })

        const user = await User.findOne({ phone: checkRevicerId })
        if (!user)
            return res.status(400).json({ success: false, message: `no user have phone ${checkRevicerId}` })

        //check the conversation is init
        const conversation = await Conversation.find({
            $or: [{ members: [req.userId, req.body.receiverId] }, { members: [req.body.receiverId, req.userId] }],
        })

        // console.log(conversation)

        if (conversation.length >0) {
            return res.status(400).json({ success: false, message: 'the conversation is already' })
        }

        //create new conversation and save
        const newConversation = new Conversation({
            members: [req.userId, req.body.receiverId]
        })

        try {
            const savedConversation = await newConversation.save()
            return res.status(200).json({ success: true, message: "create new conversation successfully", Conversation: savedConversation })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }





    }

    //get conversation by UserId
    //get api/conversation/conversations
    async conversationByUserId(req, res) {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.userId] },
            })
            res.status(200).json({ success: true, message: 'nice (>.<)', conversations: conversation })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    }


    async checkIsNitConversation(req, res) {
        const conversations = await Conversation.find({
            $or: [{ members: [req.userId, req.body.receiverId] }, { members: [req.body.receiverId, req.userId] }]
        })
        try {
            if (conversations)
                res.json({ success: true, message: conversations })
        } catch (error) {
            res.json({ success: false, message: error.message })
        }
    }
}

module.exports = new ConversationController