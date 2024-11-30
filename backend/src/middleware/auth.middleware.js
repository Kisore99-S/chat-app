import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    req.user = user;
    next();
  } catch (error) {
    console.log(`Error in protect route middleware: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
