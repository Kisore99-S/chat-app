import exporess from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsers } from "../controllers/user.controller.js";

const router = exporess();

router.get("/list", protectRoute, getUsers);

export default router;
