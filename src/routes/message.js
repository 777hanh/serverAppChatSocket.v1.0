const express = require('express')
const router = express.Router()
const MessageController = require('../app/controllers/messageController')
const verifyToken = require('../middelware/auth')

router.post('/add', verifyToken, MessageController.addMess)
router.get('/:conversationId', verifyToken, MessageController.getMess)

module.exports = router