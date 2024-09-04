const express=require("express");
const {check}=require("express-validator");
const hotelController=require("../controller/hotel_controller");
// const hotelController=require("./controller/room_controller");

const router=express.Router();

router.post("/hotel",[check("name").not().isEmpty(),check("location").not().isEmpty(),check("images").not().isEmpty()],hotelController.createHotel);
router.patch("/hotel/:pid",[check("name").not().isEmpty(),check("location").not().isEmpty(),check("images").not().isEmpty()],hotelController.updateHotel);

router.get("/hotel",hotelController.getHotel);
router.get('/hotels/search', hotelController.getHotelByLocation);
router.get("/hotel/:pid",hotelController.getHotelById);
router.delete("/hotel/:pid",hotelController.deleteHotelById);

module.exports=router;