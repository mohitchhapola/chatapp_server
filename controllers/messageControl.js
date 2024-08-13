const Message = require('../models/messageModel')
const Chat = require('../models/chatModel');
const {getReceiverSocketId,io} = require('../socket/socket')
const User = require('../models/user')

const sendMsg = async (req, res) => {
    try {
        // console.log("req.user", req.user);

        const { message } = req.body;
        const senderId = req.user._id; // Corrected retrieval of senderId
        console.log("sender", senderId);

        const receiverEmail = req.params.id; // Assuming you pass the email in the URL params
        console.log(receiverEmail,"recicever id")

        // Find receiver's ObjectId by email
        const receiver = await User.findOne({ email: receiverEmail });
        if (!receiver) {
            return res.status(404).json({ error: "Receiver not found" });
        }
        const receiverId = receiver._id;

        // Find or create the chat
        let chat = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!chat) {
            chat = await Chat.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            message,
            senderId,
            receiverId,
        });

        if (newMessage) {
            chat.messages.push(newMessage._id);
        }

        await Promise.all([chat.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(receiverId); // Corrected spelling to receiverSocketId
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("error in messaging", error.message);
        res.status(400).json({ error: error.message }); // Return a JSON error response
    }
};



module.exports = {
    sendMsg
}