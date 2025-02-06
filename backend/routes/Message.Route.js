import express from 'express'
import { GetMessages, sendMessage } from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'

export const MessageRoute = express.Router()

MessageRoute.post('/send/:id',protectRoute,sendMessage)
MessageRoute.get('/:id',protectRoute,GetMessages)
