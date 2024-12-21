const User = require('../models/User');


exports.renderSignup = (req, res) => {
    res.render('auth/signup', { message: req.flash('message') });
};


exports.signup = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = new User({ username, password, role });
        await user.save();
        req.flash('message', 'Signup successful! Please log in.');
        res.redirect('/auth/login');
    } catch (err) {
        req.flash('message', 'Given username already exists try new one');
        res.redirect('/auth/signup');
    }
};


exports.renderLogin = (req, res) => {
    res.render('auth/login', { message: req.flash('message') });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            req.flash('message', 'User not found!');
            return res.redirect('/auth/login');
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            req.flash('message', 'Incorrect password!');
            return res.redirect('/auth/login');
        }

        req.session.user = { id: user._id, role: user.role };
        if (user.role === 'Main Admin') {
            return res.redirect('/hotels');
        } else if (user.role === 'Guest Admin') {
            return res.redirect('/all-guests');
        } else if (user.role === 'Guest') {
            return res.redirect('/hotels'); // Redirect to guest landing page
        }
    } catch (err) {
        req.flash('message', 'Error during login: ' + err.message);
        res.redirect('/auth/login');
    }
};


// Handle logout
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    });
};
