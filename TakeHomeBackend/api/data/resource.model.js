const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const ResourceSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
  },
  year: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: false,
  },
  pantone_value: {
    type: String,
    default: false,
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

exports.Resource = mongoose.model("Resource", ResourceSchema);
