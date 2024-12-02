import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });
7
    if (newUser) {
      generateToken(newUser.id, res);
      return res.status(201).json({
        _id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        avatarUrl: newUser.avatarUrl,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log(`Error in signup controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user.id, res);

    return res.status(200).json({
      _id: user.id,
      email: user.email,
      username: user.username,
      avatarUrl: user.avatarUrl,
    });
  } catch (error) {
    console.log(`Error in login controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(`Error in logout controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(`Error in check auth controller: ${error.message}`);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
