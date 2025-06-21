import express from "express"
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { fetchUsers, getMessages, sendMessage } from "../controller/message.controller.js";

const router=express.Router()

router.get("/users",isAuthenticated,fetchUsers);
router.get("/:id",isAuthenticated,getMessages);
router.post("/send/:id",isAuthenticated,sendMessage);

export default router;