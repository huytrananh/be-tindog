// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const axios = require("axios");

exports.loginWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    if (!email || !password) {
      return res.status(401).json({
        status: "fail",
        message: "Wrong email & password",
      });
    }

    const user = await User.checkEmailPassword(email, password);
    // const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Wrong user",
      });
    }

    const token = await user.generateToken();

    res.status(201).json({
      status: "success",
      data: {
        user: user,
        token: token,
      },
    });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.loginFacebook = async (req, res, next) => {
  const fbToken = req.query.token;

  if (!fbToken) {
    return res.status(401).json({ status: "failed", error: "need token" });
  }

  const data = await axios.get(
    `https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`
  );

  const user = await User.findOneOrCreate({
    email: data.data.email,
    name: data.data.name,
  });

  const token = await user.generateToken();
  console.log(token);
  return res.status(200).json({ status: "success", data: { user, token } });
};

