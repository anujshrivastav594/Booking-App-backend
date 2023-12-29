import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
// import { createError } from "../utils/error.js";//return err

// create Room

export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;  
    const newRoom = new Room(req.body)
    try {
    const savedRoom = await newRoom.save();
      
      try {
          await Hotel.findByIdAndUpdate(hotelId, {$push: {rooms: savedRoom._id}})
      }catch(err) {
          next(err);
      }

    res.status(200).json(savedRoom);
    }catch(err) {
      // res.status(500).json(err);
      next(err);//here  next is call back function use for juming to the next middddleware in index.js file
    }
    
}
// update Room

export const updateRoom = async (req, res, next) => {

    try {
      const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      res.status(200).json(updatedRoom)
    }catch(err) {
      // res.status(500).json(err);
      next(err);
    }
  }
  //update room avilibility

  export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };
// delete Room

export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
   try {
    await Room.findByIdAndDelete(req.params.id)
    try {
      await Hotel.findByIdAndUpdate(hotelId, {$pull: {rooms: req.params.id}})
    }catch(err) {
    next(err);
    }
    res.status(200).json("Room Deleted")
   }catch(err) {
    next(err);
    }
      
    }
// get Room

export const getRoom = async (req, res, next) => {

    try {
      const room = await Room.findById(req.params.id)
      res.status(200).json(room)
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
  }
// get all Room

export const getAllRoom = async (req, res, next) => {
    
    // return next();//next function used to call next middleware from index.js

    try {
      const rooms = await Room.find();
      res.status(200).json(rooms)
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
  }