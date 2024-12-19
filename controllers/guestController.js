const Guest = require('../models/Guest');
const Hotel = require('../models/Hotel');


exports.renderGuestLanding = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            req.flash('message', 'Hotel not found!');
            return res.redirect('/');
        }
        res.render('guestLanding', { hotel, message: req.flash('message') });
    } catch (err) {
        req.flash('message', 'Error loading landing page: ' + err.message);
        res.redirect('/');
    }
};



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


exports.getAllGuests = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const guests = await Guest.find({ hotel: req.session.user.hotelId }).populate('hotel');
        res.render('guestAdmin/allGuests', { guests });
    } catch (err) {
        req.flash('message', 'Error fetching guest details: ' + err.message);
        res.redirect('/');
    }
};


