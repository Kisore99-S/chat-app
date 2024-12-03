import http from "node:http";
import { Server } from "socket.io";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const userSocketMap = {};

export const getReceiverSocketId = (userId) => userSocketMap[userId];

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);
  const userId = socket.handshake.query.userId;
  userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("typing", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    io.to(receiverSocketId).emit("typing", { senderId });
  });
  
  socket.on("stoppedTyping", ({ senderId, receiverId }) => {
    const receiverSocketId = userSocketMap[receiverId];
    io.to(receiverSocketId).emit("stoppedTyping", { senderId });
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
