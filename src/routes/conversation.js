const express = require('express')
const router = express.Router()
const ConversationController = require('../app/controllers/conversationController')
const verifyToken = require('../middelware/auth')

router.get('/conversations', verifyToken, ConversationController.conversationByUserId)
router.get('/getall', verifyToken, ConversationController.getAllConversations)
router.get('/room', verifyToken, ConversationController.checkIsNitConversation)
router.post('/', verifyToken, ConversationController.createConversation)

module.exports = router