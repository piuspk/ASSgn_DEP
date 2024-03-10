const validator = require("validator");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "xyxxxxuuusisi";

// installed validator package
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Invalid phone number. Please provide a 10-digit phone number.",
    },
  },
  person_name: {
    type: String,
    required: true,
    trim: true, // Trim spaces from both left and right sides
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not valid Email");
      }
    },
  },

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.generateAuthtoken = async function () {
  try {
    let newtoken = jwt.sign({ _id: this._id }, SECRET_KEY, {
      expiresIn: "1d",
    });
    this.tokens = this.tokens.concat({ token: newtoken });
    await this.save();
    return newtoken;
  } catch (error) {
    res.status(400).json(error);
  }
};

const users = new mongoose.model("users", userSchema);

module.exports = users;
