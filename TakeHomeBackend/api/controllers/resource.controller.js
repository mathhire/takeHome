const mongoose = require("mongoose");

const { Resource } = require("../data/resource.model");

module.exports.postResource = async (req, res) => {
  console.log("Inside Post resource api");

  const {
    body: { name, year, color, pantone_value },
    user: { _id: owner },
  } = req;
  try {
    const resource = new Resource({
      name,
      owner,
      year,
      color,
      pantone_value,
    });

    resource.save();

    res.send({
      resource,
      error: false,
      message: "Resource Posted successfully",
    });
  } catch (err) {
    console.log("Resource post api failed: ", err.message);
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

module.exports.getAllResource = async (req, res) => {
  console.log("Inside Get All resource API");
  const {
    user: { _id },
  } = req;
  try {
    const resource = await Resource.find({ isDeleted: false });

    res.send({ resources: resource, message: "Resource Fetched successfully" });
  } catch (err) {
    console.log("get all resource api failed: ", err);
    return res.status(500).send({ error: true, message: err.message });
  }
};

module.exports.deleteResourceById = async (req, res) => {
  console.log("Inisde delete resource details api");
  const {
    params: { id },
  } = req;

  try {
    const blog = await Resource.findByIdAndUpdate(
      { _id: id },
      { isDeleted: true },
      { new: true, upsert: true }
    );
    res.send({ blog, message: "Resource deleted successfully" });
  } catch (err) {
    console.log("delete resource api failed: ", err);
    res.status(500).send({ error: true, message: err.message });
  }
};
