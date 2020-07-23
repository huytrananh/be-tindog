const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate(value){
          if(!validator.isEmail(value)){
              throw new Error("Email is invalid")
          }
      }
    },
    name: {
      type: String,
      require: [true, "Name is required"],
      trim: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
    },
    phone: {
      type: Number,
      require: [true, "Phone number is required"],
    },
    tokens: [String],
    type: {
      type: String,
      enum: ["guess", "kennel", "admin"],
      required: [true, "Type is required"],
      default: "guess",
    },
    city: String,
    relationship: String,
    interestedIn: String,
    country: String,
    age: Number,
    address: String,
    avatar: String,
    gender: String,
    images: String
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual('kennels', {
  ref: 'Kennel',
  localField: '_id',
  foreignField: 'user',
});
// method => only use if have a user
userSchema.methods.generateToken = async function () {
  const user = this;
  // this will refer to the instance of user
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.SECRET
  );
  user.tokens.push(token);
  await user.save();
  return token;
};

// statics => can use everywhere
userSchema.statics.checkEmailPassword = async function (
  userEmail,
  userPassword
) {
  const user = await User.findOne({ email: userEmail });
  if (!user) return null;
  // const match = (userPassword === user.password)
  const match = await bcrypt.compare(userPassword, user.password);
  // if true => return user
  if (match) {
    return user;
  }
  return null;
};

// Hash the password
userSchema.pre("save", async function (next) {
  // pre: middle ware
  // this = the instance of User model
  if (this.isModified("password")) {
    // ??
    this.password = await bcrypt.hash(this.password, 10); //  round = complicated of password
  }
  next();
});

userSchema.statics.findOneOrCreate = async function ({ email, name }) {
  // `this` refers to User model
  let user = await this.findOne({ email });
  if (!user) {
    user = await this.create({
      email: email,
      name: name,
    });
  }
  return user;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
