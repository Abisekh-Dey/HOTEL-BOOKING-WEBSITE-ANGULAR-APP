const express = require("express");
const { check } = require("express-validator");
const bodyParser = require("body-parser");
const roomController = require("../controller/room_controller");

const router = express.Router();
router.use(bodyParser.json()); // To use the middleware body-parser

router.post("/room/:pid",[check('number').notEmpty(),check('type').notEmpty(),check('price').notEmpty(),check('isAc').notEmpty(),check('images').isArray()],roomController.createRoom);
router.patch("/room/:pid", [check("number").notEmpty(),check("type").notEmpty(),check("price").notEmpty(),check('isAc').notEmpty(),check('images').isArray()], roomController.updateRoom);

router.get("/room/:pid", roomController.getRoom);
router.get("/hotel/room/:hid/:pid", roomController.getRoomById);
router.delete("/room/:pid", roomController.deleteRoomById);

module.exports = router;
