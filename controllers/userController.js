const User = require("../models/userModel");
const { JsonWebTokenError } = require("jsonwebtoken");
// const AppError = require("../utils/appError");
// const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const Kennel = require("../models/kennelModel");

exports.createUser = async (req, res, next) => {
  try {
    const { email, name, password, phone, address, city, interestedIn, relationship, country, age, avatar, gender, images} = req.body;
    if (!email || !name || !password || !phone ) {
      return res.status(401).json({
        status: "fail",
        message: "Missing something",
      });
    }

    const user = await User.create({
      email: email,
      name: name,
      password: password,
      phone: phone,
      city: city, 
      interestedIn: interestedIn, 
      relationship: relationship, 
      country: country,
      age: age,
      address: address,
      avatar: avatar,
      gender: gender,
      images: images
    });

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getUserList = async (req, res, next) => {
  try {
    const user = await User.find({}).populate("kennels");
    
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  // console.log(req.query.id) // http://localhost:5000/users?id=...(id from query)
  // let oldUser = await User.findById(req.query.id)
  const user = req.user

  if (req.body.name) { user.name = req.body.name; }
  if (req.body.phone) { user.phone = req.body.phone; }
  if (req.body.email) { user.email = req.body.email; }
  if (req.body.password){ user.password = req.body.password }
  if (req.body.city) { user.city = req.body.city; }
  if (req.body.relationship) { user.relationship = req.body.relationship; }
  if (req.body.interestedIn) { user.interestedIn = req.body.interestedIn; }
  if (req.body.country){ user.country = req.body.country }
  if (req.body.age) { user.age = req.body.age; }
  if (req.body.address) { user.address = req.body.address; }
  if (req.body.avatar){ user.avatar = req.body.avatar }
  if (req.body.gender){ user.gender = req.body.gender }
  if (req.body.images){ user.images = req.body.images }

  await user.save();

  res.status(200).json({
    status: "success",
    data: user,
  });
};

exports.createUserAdmin = async (req, res, next) => {
  try {
    const { email, name, password, phone, type } = req.body;
    if (!email || !name || !password || !phone) {
      return res.status(401).json({
        status: "fail",
        message: "Missing something",
      });
    }

    const user = await User.create({
      email: email,
      name: name,
      password: password,
      phone: phone,
      type: "admin"
    });

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.getMyProfile = async(req, res, next) => {
  console.log(req.user._id)
  try{
    const myprofile = await User.findById( req.user._id).populate("kennels")
    res.json({status: "success", data: myprofile})
  }catch(err){
    res.status(401).json({
      status: "fail",
      message: err.message,
    });
  }
}

exports.upgradeToKennel = async(req, res, next) => {
  const type = req.body
  if(!req.user){res.send("fail")}

  const user = await User.findByIdAndUpdate({_id: req.user._id, },{type: type.type}, {new: true})
  console.log(user)

  res.status(201).json({
    status: "success",
    data: user
  })
}