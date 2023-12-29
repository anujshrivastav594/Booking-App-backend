import User from "../models/User.js";

// update User

export const updateUser = async (req, res, next) => {

    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      res.status(200).json(updatedUser)
    }catch(err) {
      // res.status(500).json(err);
      next(err);
    }
  }
// delete User

export const deleteUser = async (req, res, next) => {
    // const failed = true;
    
    // if(failed) return next(createError(404, "sorry, you are not authenticated"));
      try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User Deleted")
      }catch(err) {
      //   res.status(500).json(err);
      next(err);
      }
    }
// get User

export const getUser = async (req, res, next) => {

    try {
      const user = await User.findById(req.params.id)
      res.status(200).json(user)
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
  }
// get all User

export const getAllUser = async (req, res, next) => {
    
    // return next();//next function used to call next middleware from index.js

    try {
      const users = await User.find();
      res.status(200).json(users);
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
}