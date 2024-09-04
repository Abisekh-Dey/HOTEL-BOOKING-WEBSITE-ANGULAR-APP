const mongoose = require("mongoose");
const Room = require("../models/room");
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

// const createRoom = async (req, res) => {
//   const { number, type, price, isAc, hotelId, images } = req.body;

//   const createdRoom = new Room({
//     number,
//     type,
//     price,
//     isAc,
//     hotel: hotelId,
//     images,
//     isBooked: false
//   });

//   try {
//     const result = await createdRoom.save();

//     // Add the room to the hotel's rooms array
//     await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: result._id }, $inc: { totalRooms: 1 } });

//     res.status(201).json(result);
//   } catch (err) {
//     res.status(500).json({ message: "Creating room failed!" });
//   }
// };
const createRoom = async (req, res, next) => {
  // console.log(req.body)
  // Validate the incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { number, type, price, isAc, images } = req.body;
  const hotelId = req.params.pid; // Extract hotel ID from the URL parameter

  // Process each image in the images array to extract the filename
  const processedImages = images.map(image => image.split('\\').pop().split('/').pop());
  if (processedImages.length === 0) {
    return next(new HttpError('Images array should not be empty.', 422));
  }
  const createdRoom = new Room({
    number,
    type,
    price,
    isAc,
    hotel: hotelId, // Use the hotel ID from the URL parameter
    images: processedImages, // Use the processed image filenames
    isBooked: false
  });

  try {
    const result = await createdRoom.save();

    // Add the room to the hotel's rooms array
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: result._id }, $inc: { totalRooms: 1 } });

    res.status(201).json(result);
  } catch (err) {
    return next(new HttpError('Creating room failed, please try again.', 502)); // Return error with status 502
  }
};
// const getRoom = async (req, res) => {
//   try {
//     const rooms = await Room.find().exec();
//     res.status(200).json(rooms);
//   } catch (err) {
//     res.status(500).json({ message: "Fetching rooms failed!" });
//   }
// };
const getRoom = async (req, res, next) => {
  const hotelId = req.params.pid; // Get the hotel ID from the URL parameters

  try {
    const rooms = await Room.find({ hotel: hotelId }).exec();

    if (rooms.length === 0) {
      // If no rooms are found, pass an error to the next middleware
      return next(new HttpError('No rooms found for this hotel', 404));
    }

    // If rooms are found, respond with the rooms data
    res.status(200).json(rooms);
  } catch (err) {
    // Handle errors by passing them to the next middleware
    return next(new HttpError('Fetching rooms failed!', 500));
  }
};


const getRoomById = async (req, res, next) => {
  const { hid, pid } = req.params;
  let room = null;

  try {
    // Correct way: pass pid directly as a string
    room = await Room.findById(pid).exec();
  }
  catch (error) {
    // Handle any other errors, such as invalid ObjectId format
    return next(new HttpError('Room not found', 404));
  }

  // Check if the room belongs to the specified hotel
  if (room.hotel.toString() === hid) {
    res.json(room);
  } else {
    return next(new HttpError('Wrong Hotel Id', 405));
  }      

};

const updateRoom = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input passed, please check your data", 422));
  }

  const { number, type, price, isAc, images } = req.body;
  const roomId = req.params.pid;
  const processedImages = images.map(image => image.split('\\').pop().split('/').pop());
  if (processedImages.length === 0) {
    return next(new HttpError('Images array should not be empty.', 422));
  }
  try {
    let room = await Room.findById(roomId);
    if (!room) {
      return next(new HttpError("Room not found!", 404));
    }

    room.number = number;
    room.type = type;
    room.price = price;
    room.isAc = isAc;
    room.images = processedImages;
    // room.isBooked = isBooked !== undefined ? isBooked : room.isBooked;

    await room.save();

    res.status(200).json(room);
  } catch (err) {
    return next(new HttpError("Updating room failed!", 500));
  }
};

const deleteRoomById = async (req, res) => {
  const id = req.params.pid;
  try {
    const room = await Room.findByIdAndDelete(id).exec();
    if (!room) {
      return res.status(404).json({ message: "Room not found!" });
    }

    // Remove the room from the hotel's rooms array
    await Hotel.findByIdAndUpdate(room.hotel, { $pull: { rooms: room._id }, $inc: { totalRooms: -1 } });

    res.status(200).json({ message: "Room deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Deleting room failed!" });
  }
};

exports.createRoom = createRoom;
exports.getRoom = getRoom;
exports.getRoomById = getRoomById;
exports.updateRoom = updateRoom;
exports.deleteRoomById = deleteRoomById;
