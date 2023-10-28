const User = require("../models/user");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.jwtKey;

//create user means sign up of the user controller
module.exports.createUser = async function (req, res) {
  try {
    //finding user into the data base
    const user = await User.findOne({ email: req.body.data.email });
    //if user is not present in the data base then only create the user
    if (!user) {
      const newUser = await User.create(req.body.data);
      const jwtToken = jwt.sign({ id: newUser._id }, jwtKey, {
        expiresIn: "2 days",
      });
      //sending the response to the database
      return res.json({
        success: true,
        message: "User created successfully",
        newUser,
        jwtToken,
      });
    } else {
      return res.json({
        success: false,
        message: "User with this email already exists",
      });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// checking the sign in data and sending the response
module.exports.signIn = async function (req, res) {
  try {
    const user = await User.findOne({
      email: req.body.data.email,
      password: req.body.data.password,
    });
    //if user is in the based than only login
    if (user) {
      const jwtToken = jwt.sign({ id: user._id }, jwtKey, {
        expiresIn: "2 days",
      });
      return res.json({
        success: true,
        message: "Rendered sign-in page successfully",
        user,
        jwtToken,
      });
    } else {
      return res.json({ success: false, message: "Wrong credential" });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//log out user controller
module.exports.destroy = function (req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout done",
    });
  } catch (err) {
    return res.status(500), json({ success: false, message: err.message });
  }
};
