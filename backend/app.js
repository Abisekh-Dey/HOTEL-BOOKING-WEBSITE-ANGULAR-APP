const mongoose = require('mongoose');
const express = require("express");
const cors=require('cors');
const bodyParser = require("body-parser");
const app = express();
const hotelRouter = require("./routes/hotel_route");
const roomRouter = require("./routes/room_route");
const userRouter = require("./routes/user_route");
const bookingRouter = require("./routes/booking_route");
const reviewRouter = require("./routes/review_route");
const adminRouter = require("./routes/admin_route.js");
const passwordRouter = require("./routes/password_route.js");
const wishlistRouter = require("./routes/wishlist_route.js");
const feedbackRouter = require("./routes/feedback_route.js");

app.use(cors())
app.use(bodyParser.json());
app.use(express.static('public'));//to use the static files like .jpg,.jpeg
app.use(hotelRouter);
app.use(roomRouter);
app.use(userRouter);
app.use(bookingRouter);
app.use(reviewRouter);
app.use(adminRouter);
app.use(passwordRouter);
app.use(wishlistRouter);
app.use(feedbackRouter);

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection Failed!");
  });

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
