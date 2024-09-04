const mongoose = require("mongoose");
const Hotel = require("../models/hotel");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connected to database");
//   })
//   .catch(() => {
//     console.log("Connection Failed!");
//   });

  const createHotel = async (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, location, images } = req.body;
    const imageName = images.split('\\').pop().split('/').pop(); // Extract filename
  
    const createHotel = new Hotel({
      name,
      location,
      images: imageName, // Save only the filename
    });
  
    // const result = await createHotel.save();
    // res.json(result);
    try {
      const result = await createHotel.save();
      res.status(201).json(result);
    } catch (err) {
      return next(new HttpError('Creating Hotel failed, please try again.', 502));//Changed the error status from 500 to 502
    }
  };
  
const getHotel = async (req, res) => {
  const hotels = await Hotel.find().exec();
  if (!hotels) {
    res.send("Not Found");

  } else {
    res.json(hotels);
  }
};

const getHotelByLocation = async (req, res) => {
  // Extract the location from the request body
  const { location } = req.query;

  try {
    const hotels = await Hotel.find({ location }).exec();
    if (!hotels || hotels.length === 0) {
      return res.status(404).send("Not Found");
    }
    res.json(hotels);
  } catch (err) {
    res.status(500).send(err.message);
  }
};


const getHotelById = async (req, res,next) => {
  const id = req.params.pid;
  const hotel = await Hotel.findById(id).exec();
  if (!hotel) {
    // res.send("Not Found");
    return next(new HttpError('Hotel not found', 404));
  } else {
    res.json(hotel);
  }
};

const updateHotel = async (req, res, next) => {
  // console.log(req.body);
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return next(new HttpError("Invalid Input Passed, Please Check your data", 422));
    }
  
    const { name, location, images } = req.body;
    const imageName = images.split('\\').pop().split('/').pop(); // Extract filename
    const hotelId = req.params.pid;
    // console.log(hotelId);
  
    let hotel;
    try {
      hotel = await Hotel.findById(hotelId);
      if (!hotel) {
        const error = new HttpError("Could not find a hotel for the provided id.", 404);
        return next(error);
      }
    } catch (err) {
      const error = new HttpError("Something Went Wrong, Could not Update hotel", 500);
      return next(error);
    }
  
    hotel.name = name;
    hotel.location = location;
    hotel.images = imageName;
    // try {
    //   await hotel.save();
    // } catch (err) {
    //   const error = new HttpError("Something Went Wrong, Could not Update hotel", 500);
    //   return next(error);
    // }
  
    // res.status(200).json({ hotel: hotel.toObject({ getters: true }) });

    try {
      const result = await hotel.save();
      res.status(201).json(result);
    } catch (err) {
      return next(new HttpError('Something Went Wrong, Could not Update hotel', 500));//Changed the error status from 500 to 502
    }
  };
  
const deleteHotelById = async (req, res) => {
  const id = req.params.pid;
  const hotel = await Hotel.findByIdAndDelete(id).exec();

  if (!hotel) {
    // res.send("Hotel Not Found");
    return res.status(404).send("Hotel Not Found");
  } else {
    // res.send("Deleted");
    return res.status(200).json({ message: "Deleted", hotel });
  }
  res.json(hotel);
};

exports.createHotel = createHotel;
exports.getHotel = getHotel;
exports.getHotelByLocation = getHotelByLocation;
exports.getHotelById = getHotelById;
exports.updateHotel = updateHotel;
exports.deleteHotelById = deleteHotelById;
