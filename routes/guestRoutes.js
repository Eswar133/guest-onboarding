const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');


router.get('/guest-landing/:hotelId', guestController.renderGuestLanding);
router.post('/guest-landing/:hotelId', guestController.submitGuestForm);
router.get('/all-guests', guestController.getAllGuests);
router.get('/edit-guest/:guestId', guestController.renderEditGuest);
router.post('/edit-guest/:guestId', guestController.updateGuest);
router.get('/guest-dashboard', guestController.renderGuestDashboard);
router.get('/book-hotel/:hotelId', guestController.bookHotel);
router.get('/bookings', guestController.showBookings);
router.get('/hotels', guestController.showHotelsForGuests);

module.exports = router;
