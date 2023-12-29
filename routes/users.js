import express from "express";
import User from "../models/User.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

import { updateUser, deleteUser, getUser, getAllUser } from "../controllers/user.js";


import { createError } from "../utils/error.js";

const router = express.Router();

//update
router.put("/:id", verifyUser, updateUser);
//delete
router.delete("/:id",verifyUser, deleteUser);
//get
router.get("/:id",verifyUser, getUser);
//get all
router.get("/", verifyAdmin, getAllUser);

export default router;