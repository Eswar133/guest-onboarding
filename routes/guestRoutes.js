const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');


router.get('/guest-landing/:hotelId', guestController.renderGuestLanding);
router.post('/guest-landing/:hotelId', guestController.submitGuestForm);
router.get('/all-guests', guestController.getAllGuests);

module.exports = router;
