import prisma from "../lib/prisma.js";

export const sendMessage = async (req, res) => {
  const { content } = req.body;
  const { id: receiverId } = req.params;
  console.log("request user->", req.user);
  const senderId = req.user.id;
  try {
    const newMessage = await prisma.message.create({
      data: {
        content,
        senderId,
        receiverId,
      },
    });
    return res.status(201).json({ newMessage });
  } catch (error) {
    console.log(`Error in send message controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  const { id: userToChatId } = req.params;
  const currentUserId = req.user.id;
  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: currentUserId,
            receiverId: userToChatId,
          },
          {
            senderId: userToChatId,
            receiverId: currentUserId,
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json(messages);
  } catch (error) {
    console.log(`Error in get messages controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
