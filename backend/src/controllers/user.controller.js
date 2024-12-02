import prisma from "../lib/prisma.js";

export const getUsers = async (req, res) => {
  const currentUserId = req.user.id;
  try {
    const filteredUsers = await prisma.user.findMany({
      where: {
        NOT: { id: currentUserId },
      },
    });
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(`Error in get users controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
