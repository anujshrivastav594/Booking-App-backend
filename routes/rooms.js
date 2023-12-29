import express from "express";
import Room from "../models/Room.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom, updateRoomAvailability } from "../controllers/room.js";

import { createError } from "../utils/error.js";

const router = express.Router();


//create
router.post("/:hotelid", verifyAdmin, createRoom);
//update
//UPDATE
router.put("/availability/:id", updateRoomAvailability);
router.put("/:id", verifyAdmin, updateRoom);
//delete
router.delete("/:id/:hotelid", verifyAdmin,deleteRoom);
//get
router.get("/:id", getRoom);
//get all
router.get("/", getAllRoom);

export default router;