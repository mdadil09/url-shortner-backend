const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/config");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (!name || !email || !password)
      res.status(401).send("Please fill required field");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(500).send("User already exist");
    }

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        res.status(401).send("Password is wrong");
      }
      res.status(200).json({
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).send("Invalid email");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
};
