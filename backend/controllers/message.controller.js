import Conversation from "../models/conversation.model.js";
import Message from "../models/messages.model.js";
import { getReciverSocketId, io } from "../socket/Socket.js";



export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        //create message
        const newMesages = await Message({
            senderId,
            receiverId,
            message
        })

        if (newMesages) {
            conversation.messages = conversation.messages || [];
            conversation.messages.push(newMesages._id);
        }

        //await conversation.save()
        //await newMesages.save()

        //instead of this use

        await Promise.all([conversation.save(), newMesages.save()]);

        //scoket io here 
        const recieverScoketId = getReciverSocketId(receiverId);
        if (recieverScoketId) {
            io.to(recieverScoketId).emit("new message",newMesages)
        }

        return res.json({
            sucess: true,
            message: "message sent",
            newMesages
        })


    } catch (error) {
        console.log("Error in sendMessage Route", error.message)
        return res.status(500).json({ error: "internal server Error" })
    }
}

export const GetMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages")//show actual messages

        if (!conversation) {
            return res.status(200).json([]); 
        }

        // const messages = conversation.messages || [];
        return res.status(200).json(conversation.messages || []);

    } catch (error) {
        console.log("Error in sendMessage Route", error.message)
        return res.status(500).json({ error: "internal server Error" })
    }
}