const bcrypt = require('bcrypt');
const User = require('../models/user');

// Hardcoded users for authorization
const hardcodedUsers = [
    { username: 'aryan', password: 'ARYAN123' },
    { username: 'admin', password: 'ADMIN456' },
    { username: 'staff1', password: 'STAFF123' }
];

// Function to register a new user
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Function to handle login
const login = async (req, res) => {
    const { username, password } = req.body;

    // Check against hardcoded users first
    const hardcodedUser = hardcodedUsers.find(u => u.username === username);
    if (hardcodedUser) {
        const match = await bcrypt.compare(password, await bcrypt.hash(hardcodedUser.password, 10));
        if (match) {
            return res.status(200).json({ message: 'Login successful' });
        }
    }

    // Check against database users
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare passwords for database user
    const match = await bcrypt.compare(password, user.password);
    if (match) {
        return res.status(200).json({ message: 'Login successful' });
    } else {
        return res.status(401).json({ message: 'Invalid username or password' });
    }
};

// Example of manually adding a user (for testing purposes)
const createAdminUser = async () => {
    const username = 'aryan';
    const plainPassword = 'ARYAN123'; // Your chosen password

    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Create a new user
    const adminUser = new User({
        username,
        password: hashedPassword
    });

    try {
        await adminUser.save();
        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Uncomment the following line to create an admin user
// createAdminUser();

module.exports = { registerUser, login };
