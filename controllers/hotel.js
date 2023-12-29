import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"
// create hotel

export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)
    try {
      const savedHotel = await newHotel.save();
      res.status(200).json(savedHotel)
    }catch(err) {
      // res.status(500).json(err);
      next(err);//here  next is call back function use for juming to the next middddleware in index.js file
    }
}
// update hotel

export const updateHotel = async (req, res, next) => {

    try {
      const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
      res.status(200).json(updatedHotel)
    }catch(err) {
      // res.status(500).json(err);
      next(err);
    }
  }
// delete hotel

export const deleteHotel = async (req, res, next) => {
    // const failed = true;
    
    // if(failed) return next(createError(404, "sorry, you are not authenticated"));
      try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel Deleted")
      }catch(err) {
      //   res.status(500).json(err);
      next(err);
      }
    }
// get hotel

export const getHotel = async (req, res, next) => {

    try {
      const hotel = await Hotel.findById(req.params.id)
      res.status(200).json(hotel)
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
  }
// get all hotel

export const getAllHotel = async (req, res, next) => {
    const {min, max, limit, ...others} = req.query;
    try {
      const hotels = await Hotel.find({
        ...others,
        cheapestPrice: {$gt: min || 1, $lt: max || 999}
        
      }).limit(limit);
      // console.log({featured: req.query.featured});
     
      res.status(200).json(hotels);
    }catch(err) {
    //   res.status(500).json(err);
    next(err);
    }
  }


  export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")//split use to find comma and stop make add element to array
    // console.log(cities);
    try {
      const list = await Promise.all(cities.map(town=>{
         return Hotel.countDocuments({city:town});// or Hotel.find({city:city}).length->take longer time
      }));
      res.status(200).json(list);
    }catch(err) {
    next(err);
    }
  }

  export const countByType = async (req, res, next) => {
    
    try {
      const hotelCount = await Hotel.countDocuments({type:"hotel"});
      const apartmentCount = await Hotel.countDocuments({type:"apartment"});
      const resortCount = await Hotel.countDocuments({type:"resort"});
      const villaCount = await Hotel.countDocuments({type:"villa"});
      const cabinCount = await Hotel.countDocuments({type:"cabin"});
      res.status(200).json([
        {type:"Hotels", count: hotelCount},
        {type:"Apartments", count: apartmentCount},
        {type:"Resorts", count: resortCount},
        {type:"Villas", count: villaCount},
        {type:"Cabins", count: cabinCount}
      ])
    }catch(err) {
    next(err);
    }
  }
// get all hotelRooms
  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room_id) => {
          return Room.findById(room_id);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  