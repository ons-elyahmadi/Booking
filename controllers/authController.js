const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.send({ token });
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = new User({ email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.logout = async (req, res) => {
    try {
        // Implement your logout logic here
        // For example, if you're using JWT tokens, you may need to clear the token from client-side storage or invalidate it on the server-side
        // Assuming you're using JWT tokens, you may want to clear the token from client-side storage
        res.clearCookie('jwt');
        res.json({ message: 'You have been logged out successfully.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
