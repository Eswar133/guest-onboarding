const Hotel = require('../models/Hotel');
const QRCode = require('qrcode');


exports.renderAddHotel = (req, res) => {
    res.render('admin/addHotel', { message: req.flash('message') });
};

exports.addHotel = async (req, res) => {
    const { name, address } = req.body;
    const logo = req.file ? req.file.filename : null;

    try {
        const hotel = new Hotel({ name, address, logo });
        await hotel.save();
        req.flash('message', 'Hotel added successfully!');
        res.redirect('/hotels');
    } catch (err) {
        req.flash('message', 'Error adding hotel: ' + err.message);
        res.redirect('/hotels/add');
    }
};


exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('admin/hotels', { hotels, user: req.session.user }); // Pass user data
    } catch (err) {
        console.error('Error fetching hotels:', err.message);
        req.flash('message', 'Error fetching hotels: ' + err.message);
        res.redirect('/');
    }
};



exports.generateQRCode = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            req.flash('message', 'Hotel not found!');
            return res.redirect('/hotels');
        }

        const qrCodeData = await QRCode.toDataURL(`http://localhost:3000/guest-landing/${hotel._id}`);
        hotel.qrCode = qrCodeData;
        await hotel.save();

        req.flash('message', 'QR Code generated successfully!');
        res.redirect('/hotels');
    } catch (err) {
        console.error('Error generating QR code:', err);
        req.flash('message', 'Error generating QR code.');
        res.redirect('/hotels');
    }
};
