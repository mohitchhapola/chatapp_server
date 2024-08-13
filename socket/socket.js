const { Server } = require('socket.io');
// const io = new Server(server);
const server = require('http').createServer();
const app = require('express')


const io = new Server(server, {
	cors: {
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
	},
});

 const getReceiverSocketId = (receiverId) => {
	return userSocketMap[receiverId];
};
const userSocketMap = {}; // {userId: socketId}



io.on("connection", (socket) => {
	console.log("a user connected", socket.id);

	const userId = socket.handshake.query.userId;
	if (userId != "undefined") userSocketMap[userId] = socket.id;

	io.emit("getOnlineUsers", Object.keys(userSocketMap));

	socket.on("disconnect", () => {
		console.log("user disconnected", socket.id);
		delete userSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
});


module.exports = { app, io, server,getReceiverSocketId };