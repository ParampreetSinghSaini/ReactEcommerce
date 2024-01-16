const User = require('../models/User.js');
const jwt = require('jsonwebtoken');


exports.register = async  (req, res) => {
   
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign({ email: newUser.email, name: newUser.name }, 'test@ecommerceWebsite12345');
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message });
    }
};



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ email: user.email, name: user.name }, 'test@ecommerceWebsite12345');
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to login' });
    }
};
