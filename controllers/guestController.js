const Guest = require('../models/Guest');
const Hotel = require('../models/Hotel');
const Booking = require('../models/Booking'); // Remove duplicate declarations

// Render the Guest Landing Page
exports.renderGuestLanding = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            req.flash('message', 'Hotel not found!');
            return res.redirect('/');
        }
        res.render('guest/guestLanding', { hotel, message: req.flash('message') });
    } catch (err) {
        req.flash('message', 'Error loading landing page: ' + err.message);
        res.redirect('/');
    }
};

// Submit Guest Form
exports.submitGuestForm = async (req, res) => {
    const { hotelId } = req.params;
    const { fullName, mobileNumber, address, purpose, stayDatesFrom, stayDatesTo, email, idProofNumber } = req.body;

    try {
        const guest = new Guest({
            fullName,
            mobileNumber,
            address,
            purpose,
            stayDates: { from: stayDatesFrom, to: stayDatesTo },
            email,
            idProofNumber,
            hotel: hotelId,
        });

        await guest.save();
        res.render('guest/thankYou');
    } catch (err) {
        req.flash('message', 'Error submitting form: ' + err.message);
        res.redirect(`/guest-landing/${hotelId}`);
    }
};

// Get All Guests
exports.getAllGuests = async (req, res) => {
    try {
        const guests = await Guest.find().populate('hotel'); // Fetch all guests with hotel details
        res.render('guestAdmin/guestDetails', { guests, message: req.flash('message') }); // Render with guests data
    } catch (err) {
        console.error('Error fetching guest details:', err.message);
        req.flash('message', 'Error fetching guest details: ' + err.message);
        res.redirect('/');
    }
};

// Render Edit Guest Page
exports.renderEditGuest = async (req, res) => {
    const { guestId } = req.params;

    try {
        const guest = await Guest.findById(guestId).populate('hotel');
        if (!guest) {
            req.flash('message', 'Guest not found!');
            return res.redirect('/all-guests');
        }
        res.render('guestAdmin/editGuest', { guest, message: req.flash('message') });
    } catch (err) {
        req.flash('message', 'Error loading guest details: ' + err.message);
        res.redirect('/all-guests');
    }
};

// Update Guest
exports.updateGuest = async (req, res) => {
    const { guestId } = req.params;
    const { fullName, mobileNumber, address, purpose, stayDatesFrom, stayDatesTo, email, idProofNumber } = req.body;

    try {
        const guest = await Guest.findByIdAndUpdate(
            guestId,
            {
                fullName,
                mobileNumber,
                address,
                purpose,
                stayDates: { from: stayDatesFrom, to: stayDatesTo },
                email,
                idProofNumber,
            },
            { new: true } // Return the updated document
        );

        if (!guest) {
            req.flash('message', 'Guest not found!');
            return res.redirect('/all-guests');
        }

        req.flash('message', 'Guest updated successfully!');
        res.redirect('/all-guests');
    } catch (err) {
        req.flash('message', 'Error updating guest: ' + err.message);
        res.redirect(`/edit-guest/${guestId}`);
    }
};

// Render Guest Dashboard
exports.renderGuestDashboard = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        const bookings = await Booking.find({ guest: req.session.user.id }).populate('hotel');
        res.render('guest/guestDashboard', { hotels, bookings });
    } catch (err) {
        req.flash('message', 'Error loading dashboard: ' + err.message);
        res.redirect('/');
    }
};

// Handle Hotel Booking
exports.bookHotel = async (req, res) => {
    const { hotelId } = req.params;
    const userId = req.session.user.id;

    try {
        const booking = new Booking({ hotel: hotelId, guest: userId });
        await booking.save();
        req.flash('message', 'Hotel booked successfully!');
        res.redirect('/guest-dashboard');
    } catch (err) {
        req.flash('message', 'Error booking hotel: ' + err.message);
        res.redirect('/guest-dashboard');
    }
};

// Show Guest Bookings
exports.showBookings = async (req, res) => {
    try {
        const guestId = req.session.user.id; // Logged-in guest's ID
        const bookings = await Booking.find({ guest: guestId }).populate('hotel'); // Populate hotel details
        res.render('guest/bookings', { bookings });
    } catch (err) {
        req.flash('message', 'Error fetching bookings: ' + err.message);
        res.redirect('/');
    }
};
