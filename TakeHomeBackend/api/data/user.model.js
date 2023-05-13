const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const string = require("joi/lib/types/string");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },

  avatar: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  resetPassToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: `${this.first_name} ${this.last_name}`,
    },
    process.env.JWT_PRIVATE_KEY
  );

  return token;
};

function validateUser(user) {
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  };
  return Joi.validate(user, schema);
}

function validateLoginUser(req) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };
  return Joi.validate(req, schema);
}

function validateEmail(req) {
  const schema = {
    email: Joi.string().required().email(),
  };
  return Joi.validate(req, schema);
}

exports.User = mongoose.model("User", userSchema);
exports.validateUser = validateUser;
exports.validateLoginUser = validateLoginUser;
exports.validateEmail = validateEmail;
