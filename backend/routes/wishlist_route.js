// routes/wishlist-routes.js
const express = require('express');
const wishlistController = require('../controller/wishlist_controller');

const router = express.Router();

router.post('/wishlist', wishlistController.addHotelToWishlist);
router.delete('/wishlist/:wId', wishlistController.deleteWishlistItem);
router.get('/wishlist/:userId', wishlistController.getWishlistByUserId);

module.exports = router;
