const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const UserModel = require('../model/RegisterModal');

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 5;

// REGISTER
const Register = async (req, res) => {
  try {
    const userData = req.body;

    // Hash password
    const hash = await bcrypt.hash(userData.password, saltRounds);
    userData.password = hash;

    // Create user in DB
    const newUser = await UserModel.create(userData);

    res.status(201).json({ message: "User created successfully", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};



// LOGIN without JWT
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    // Successful login
    res.json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};



module.exports = { Register, Login };
